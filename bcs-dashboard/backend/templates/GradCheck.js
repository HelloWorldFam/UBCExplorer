const exemptionList = {
    "ENGL 1xx": ["ENGL 100", "ENGL 110", "ENGL 111", "ENGL 112", "ENGL 120", "ENGL 121"],
    "STCM 3xx": ["BIOC 420", "BIOC 421", "CHEM 300", "COGS 402", "CPSC 430", "CPSC 491", "ENGL 301", "ENGL 309", "HIST 393", "HIST 394", "KIN 373", "MICB 404", "MICB 406", "MICB 412", "MICB 421", "PHIL 331", "PHIL 333", "PHIL 360", "PHIL 364", "PHIL 369", "PHIL 427", "PHIL 434", "PHIL 455", "PHIL 469", "PHYS 348", "SCIE 300", "APSC 301"],
    "STAT 203": ["STAT 203", "STAT 200", "STAT 241", "PSYC 218"],
    "MATH 180": ["MATH 100", "MATH 102", "MATH 104", "MATH 110", "MATH 120", "MATH 180", "MATH 184"]
};


var retVal = (firstName, lastName, courses) => {
    var exemptions = [];
    var exemptionReplacements = [];
    var coreCPSC = [];
    var cpscElectives = [];
    var bridgingModule = [];

    /**
     * Returns the exempted course
     * @param course
     * 
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
     */
    const getExemption = (courseCode) => {
        for (let exemption in exemptionList) {
            if (exemptionList[exemption].includes(courseCode)) return exemption;
        }
    }

    /**
     * Pushes an object to the exemptions array with the exemption category (eg. ENGL 1xx, STAT 203, etc) as the key,
     * and an array as the value with arr[0] as the course code of the course completed and arr[1] as when the student
     * completed the exemption
     * @param course 
     */
    const processExemption = (course) => {
        let exemption = getExemption(course.code);
        let courseObj = {};
        courseObj[exemption] = [course.code, course.term === "Exemptions" ? " Completed prior to BCS" : " " + course.term];
        exemptions.push(courseObj);
    }
    
    for (let term of courses) {
        /**
         * Loop through exempted courses and add them to "exemptions"
         */
        if (term.name === "Exemptions") {
            for (let course of term.courses) {
                processExemption(course);
            }
            continue;
        }

        /**
         * Loop through courses and add them to buckets.
         */
        for (let course of term.courses) {
            if (course.tag === "Exemption") {
                processExemption(course);
            } else if (course.tag === "Core Course") {
                let courseObj = {};
                courseObj[course.code] = course.term;
                coreCPSC.push(courseObj);
                let exemptionCode = getExemption(course.code);
                if (exemptionCode) {exemptions.push({[exemptionCode]: course.code + ", " + course.term});
            }
            } else if (course.tag === "Exemption Replacement") {
                exemptionReplacements.push(course.code);
            } else if (course.tag === "Upper CPSC") {
                cpscElectives.push(course.code);
            } else if (course.tag === "Bridging Module") {
                bridgingModule.push(course.code);
            }
        }
    }

    /**
     * Returns true if a course is found within a course bucket, false otherwise
     * @param course - the course to search 
     * @param courseBucket - the course bucket to be searched
     */
    const doesCourseExist = (course, courseBucket) => {
        for (let object of courseBucket) {
            if (object[course]) return true;
        }
        return false;
    }

    /**
     * Returns the term a course was taken if a course is found within a course bucket, undefined otherwise
     * @param course - the course to search 
     * @param courseBucket - the course bucket to be searched
     */
    const getCourseTermTaken = (course, courseBucket) => {
        for (let object of courseBucket) {
            if (object[course]) return object[course];
        }
        return undefined;
    }

      
    return `
    :::::::::BCS Grad Check:::::::::
    Printed from ubcexplorer.io/bcs/transcript
    For: ${firstName} ${lastName}
    Date: ${new Date}


    CAUTION: Please carefully check this grad check against your knowledge of your
    courses and plan. You should ensure you do not believe there are any errors or
    misinterpretations.

    Definitions: "3xx" means "300 or above"; "4xx" means "400 or above"; "CIP"
    means "course in progress (or registered)"; "STCM" means "Sci/Tech
    Communication" (ENGL 301, SCIE 300, or approved alternatives); "BRCS" means
    "bridging module course, may be CPSC"; "BRMD" means "bridging module course
    outside CPSC". "EXEMPT" courses must be replaced; see our welcome e-mail for
    more info, but remember that STCM 3xx (or other upper-level exemptions) must be
    replaced with an upper-level (300+) course.

    
    Non-CPSC named req'ts: 

    ENGL 1xx: ${doesCourseExist("ENGL 1xx", exemptions) ? "true - " + getCourseTermTaken("ENGL 1xx", exemptions) : false}
    MATH 180: ${doesCourseExist("MATH 180", exemptions) ? "true - " + getCourseTermTaken("MATH 180", exemptions) : false}
    STAT 203: ${doesCourseExist("STAT 203", exemptions) ? "true - " + getCourseTermTaken("STAT 203", exemptions) : false}
    STCM 3xx: ${doesCourseExist("STCM 3xx", exemptions) ? "true - " + getCourseTermTaken("STCM 3xx", exemptions) : false}


    Exemption Replacements:

    ${exemptionReplacements.map((item, index) => {
        return index === 0 ? item : " " + item;
    })}


    CPSC named req'ts:

    110: ${doesCourseExist("CPSC 110", coreCPSC) ? "true - " + getCourseTermTaken("CPSC 110", coreCPSC) : false}
    121: ${doesCourseExist("CPSC 121", coreCPSC) ? "true - " + getCourseTermTaken("CPSC 121", coreCPSC) : false}
    210: ${doesCourseExist("CPSC 210", coreCPSC) ? "true - " + getCourseTermTaken("CPSC 210", coreCPSC) : false}
    213: ${doesCourseExist("CPSC 213", coreCPSC) ? "true - " + getCourseTermTaken("CPSC 213", coreCPSC) : false}
    221: ${doesCourseExist("CPSC 221", coreCPSC) ? "true - " + getCourseTermTaken("CPSC 221", coreCPSC) : false}
    310: ${doesCourseExist("CPSC 310", coreCPSC) ? "true - " + getCourseTermTaken("CPSC 310", coreCPSC) : false}
    313: ${doesCourseExist("CPSC 313", coreCPSC) ? "true - " + getCourseTermTaken("CPSC 313", coreCPSC) : false}
    320: ${doesCourseExist("CPSC 320", coreCPSC) ? "true - " + getCourseTermTaken("CPSC 320", coreCPSC) : false}


    CPSC electives:

    ${cpscElectives.map((item, index) => {
        return index === 0 ? item : " " + item;
    })}


    Bridging module:

    ${bridgingModule.map((item, index) => {
        return index === 0 ? item : " " + item;
    })}
    `
    // EXTRA courses:
    // NOTE: This currently does not populate courses.
    // `
}

exports.GradCheck = retVal;