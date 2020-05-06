import React, { useState, useEffect } from "react";
import dragula from "react-dragula";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { TaskWrapper, TaskWrapperContent, Lane, Card, Divider, Typography } from "../CourseSelector";

export function YourDegreeCard({ usersCourseArray, setUsersCourseArray }) {
    /**
     * Use containers state to keep track of the terms
     */
    const [containers, setContainers] = useState([]);

    /**
     * Helper function to push container to containers state
     * @param {Object} container - used by Dragula to define "baskets" in which to contain courses
     */
    const onContainerReady = (container) => {
        containers.push(container);
    };
    
    /**
     * Helper function so that drag and drop functions on mobile devices
     * @param {Event} e 
     */
    var listener = function(e) {
        if (! scrollable) {
            e.preventDefault();
        }
    }
    var scrollable = true;
    document.addEventListener('touchmove', listener, { passive:false });

    useEffect(() => {
        setContainers((containers) => [...containers]);
    }, []);

    useEffect(() => {
        const drake = dragula(containers);
        drake.on("drag", function (el, source) {
            scrollable = false;
        })
        drake.on("drop", function (el, container) {
            scrollable = true;
            setContainers([]);
            el.style.backgroundColor = "#e6e6e6";
            let newCourse;
            usersCourseArray.map((term) => {
                if (term.name === el.getAttribute("term")) {
                    term.courses.map((course, courseIndex) => {
                        if (el.getAttribute("courseid") === course.code) {
                            newCourse = term.courses.splice(courseIndex, 1);
                        }
                    });
                }
            });
            usersCourseArray[container.getAttribute("termid")].courses.push(newCourse[0]);
            drake.cancel(true);
            setUsersCourseArray((usersCourseArray) => [...usersCourseArray]);
        });
    }, [usersCourseArray]);

    /**
     * Returns a delete button for each term so that user can remove term from worklist
     * @param {String} name
     * @param {Number} index
     */

    const getLaneTitle = (name, index) => {
        return (<>
            {name}
            <Button style={{
                minWidth: "30px",
                color: "#bf0a0a",
                padding: "0",
                float: "right",
            }} onClick={() => {
                usersCourseArray.splice(index, 1);
                setUsersCourseArray((usersCourseArray) => [...usersCourseArray]);
            }}>
                <DeleteIcon style={{
                    width: ".7em",
                    height: ".7em",
                }} />
            </Button>
        </>);
    };

    if (usersCourseArray && usersCourseArray[0] != -1) {
        return (<>
            {usersCourseArray.map((term, termIndex) => {
                return (<>
                    <TaskWrapper mb={4}>
                        <TaskWrapperContent>
                            <Lane title={getLaneTitle(term.name, termIndex)} className={term.name} termId={termIndex} description="" onContainerLoaded={onContainerReady}>
                                {term.courses.map((course, courseIndex) => {
                                    return (<>
                                        <Card style={{
                                            margin: "5px 5px 5px 0",
                                            padding: "10px",
                                            display: "inline-block",
                                            backgroundColor: "#e6e6e6",
                                        }} courseid={course.code} term={term.name} key={`${termIndex}_${courseIndex}`}>
                                            {course.code}
                                            <Button style={{
                                                minWidth: "30px",
                                                color: "#bf0a0a",
                                                padding: "0",
                                            }} onClick={() => {
                                                term.courses.splice(courseIndex, 1);
                                                setUsersCourseArray((usersCourseArray) => [
                                                    ...usersCourseArray,
                                                ]);
                                            }}>
                                                x
                                            </Button>
                                        </Card>
                                    </>);
                                })}
                            </Lane>
                        </TaskWrapperContent>
                    </TaskWrapper>
                </>);
            })}
        </>);
    }
    else
        return (<>
            <Divider></Divider>
            <br />
            <Typography>You have no courses.</Typography>
        </>);
}
