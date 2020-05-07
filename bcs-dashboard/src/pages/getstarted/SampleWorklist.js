export default function buildWorklist(year) {
    return (
        [{
            "name": year - 1 + "W2",
            "courses": []
        }, {
            "name": year + "S",
            "courses": []
        },{
            "name": year + "W1",
            "courses": [{
                "code": "ENGL 112",
                "name": "Strategies for University Writing",
                "desc": "Study and practice of the principles of university-level discourse, with multidisciplinary readings and emphasis on processes of research-based writing.  Essays are required. This course is not available for students in the Faculty of Arts.",
                "cred": 3,
                "tag": "Core Course",
                "term": "2019W1"
            }, {
                "code": "CPSC 110",
                "name": "Computation, Programs, and Programming",
                "desc": "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world. [3-3-0]",
                "cred": 4,
                "tag": "Core Course",
                "term": "2019W1"
            }, {
                "code": "STAT 203",
                "name": "Statistical Methods",
                "desc": "Organizing, displaying and summarizing data. Inference estimation and testing for elementary probability models. Not for credit towards a B.Sc. (Consult the Credit Exclusion list within the Faculty of Science section in the Calendar.) [3-1-0]",
                "cred": 3,
                "tag": "Core Course",
                "term": "2019W1"
            }, {
                "code": "MATH 180",
                "name": "Differential Calculus with Physical Applications",
                "desc": "Topics as for Math 100; intended for students with no previous knowledge of Calculus. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414. Not for credit for students with AP Calculus AB, AP Calculus BC, or a passing score on the UBC-SFU-UVIC-UNBC Calculus Challenge Examination. [3-0-1.5]",
                "cred": 4,
                "tag": "Core Course",
                "term": "2019W1"
            }]
        }, {
            "name": year + "W2",
            "courses": [{
                "code": "CPSC 121",
                "name": "Models of Computation",
                "desc": "Physical and mathematical structures of computation.  Boolean algebra and combinations logic circuits; proof techniques; functions and sequential circuits; sets and relations; finite state machines; sequential instruction execution. [3-2-1]",
                "cred": 4,
                "tag": "Core Course",
                "term": "2019W2"
            }, {
                "code": "CPSC 210",
                "name": "Software Construction",
                "desc": "Design, development, and analysis of robust software components. Topics such as software design, computational models, data structures, debugging, and testing. [3-2-0]",
                "cred": 4,
                "tag": "Core Course",
                "term": "2019W2"
            }, {
                "code": "ENGL 301",
                "name": "Technical Writing",
                "desc": "Study of the principles of written communication in general business and professional activities, and practice in the preparation of abstracts, proposals, reports, and correspondence. Not for credit towards the English Major or Minor.",
                "cred": 3,
                "tag": "Core Course",
                "term": "2019W2"
            }]
        }, {
            "name": (year + 1) +"S",
            "courses": [{
                "code": "CPSC 310",
                "name": "Introduction to Software Engineering",
                "desc": "Specification, design, implementation and maintenance of large, multi-module software systems. Principles, techniques, methodologies and tools for computer aided software engineering (CASE); human-computer interfaces, reactive systems, hardware-software interfaces and distributed applications. [3-2-0]",
                "cred": 4,
                "tag": "Core Course",
                "term": "2020S"
            }, {
                "code": "CPSC 213",
                "name": "Introduction to Computer Systems",
                "desc": "Software architecture, operating systems, and I/O architectures.  Relationships between application software, operating systems, and computing hardware; critical sections, deadlock avoidance, and performance; principles and operation of disks and networks. [3-3-0]",
                "cred": 4,
                "tag": "Core Course",
                "term": "2019S"
            }, {
                "code": "CPSC 221",
                "name": "Basic Algorithms and Data Structures",
                "desc": "Design and analysis of basic algorithms and data structures; algorithm analysis methods, searching and sorting algorithms, basic data structures, graphs and concurrency. [3-2-0]",
                "cred": 4,
                "tag": "Core Course",
                "term": "2019S"
            }]
        }, {
            "name": (year + 1) +"W1",
            "courses": [{
                "code": "CPSC 313",
                "name": "Computer Hardware and Operating Systems",
                "desc": "Instruction sets, pipelining, code optimization, caching, virtual memory management, dynamically linked libraries, exception processing, execution time of programs. [3-0-1]",
                "cred": 3,
                "tag": "Core Course",
                "term": "2020W1"
            }, {
                "code": "CPSC 320",
                "name": "Intermediate Algorithm Design and Analysis",
                "desc": "Systematic study of basic concepts and techniques in the design and analysis of algorithms, illustrated from various problem areas. Topics include: models of computation; choice of data structures; graph-theoretic, algebraic, and text processing algorithms. [3-0-1]",
                "cred": 3,
                "tag": "Core Course",
                "term": "2020W1"
            }]
        }, {
            "name": "Exemptions",
            "courses": []
        }]
    )
}