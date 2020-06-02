const exemptionList = {
    "ENGL 1xx": ["ENGL 100", "ENGL 110", "ENGL 111", "ENGL 112", "ENGL 120", "ENGL 121"],
    "STCM 3xx": ["BIOC 420", "BIOC 421", "CHEM 300", "COGS 402", "CPSC 430", "CPSC 491", "ENGL 301", "ENGL 309", "HIST 393", "HIST 394", "KIN 373", "MICB 404", "MICB 406", "MICB 412", "MICB 421", "PHIL 331", "PHIL 333", "PHIL 360", "PHIL 364", "PHIL 369", "PHIL 427", "PHIL 434", "PHIL 455", "PHIL 469", "PHYS 348", "SCIE 300", "APSC 301"],
    "STAT 203": ["STAT 203", "STAT 200", "STAT 241", "PSYC 218"],
    "MATH 180": ["MATH 100", "MATH 102", "MATH 104", "MATH 110", "MATH 120", "MATH 180", "MATH 184"]
};

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

var retVal = (firstName, lastName, courses) => {
    var exemptions = [];
    var exemptionReplacements = [];
    var coreCPSC = [];
    var cpscElectives = [];
    var bridgingModule = [];

    for (let term of courses) {
        /**
         * Loop through exempted courses and add them to "exemptions"
         */
        if (term.name === "Exemptions") {
            for (let course of term.courses) {
                exemptions.push(getExemption(course.code));
            }
        }

        /**
         * Loop through courses and add them to buckets.
         */
        for (let course of term.courses) {
            if (course.tag === "Core Course") {
                coreCPSC.push(course.code);
            } else if (course.tag === "Exemption Replacement") {
                exemptionReplacements.push(course.code);
            } else if (course.tag === "Upper CPSC") {
                cpscElectives.push(course.code);
            } else {
                bridgingModule.push(course.code);
            }
        }
    }
      
    return `
    :::::::::Grad Check:::::::::
    Printed from ubcexplorer.io/bcs
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

    ENGL 1xx: ${exemptions.includes("ENGL 1xx")}
    MATH 180: ${exemptions.includes("MATH 180")}
    STAT 203: ${exemptions.includes("STAT 203")}
    STCM 3xx: ${exemptions.includes("STCM 3xx")}


    Exemption Replacements:

    ${exemptionReplacements}


    CPSC named req'ts:

    110: ${coreCPSC.includes("CPSC 110")}
    121: ${coreCPSC.includes("CPSC 121")}
    210: ${coreCPSC.includes("CPSC 210")}
    213: ${coreCPSC.includes("CPSC 213")}
    221: ${coreCPSC.includes("CPSC 221")}
    310: ${coreCPSC.includes("CPSC 310")}
    313: ${coreCPSC.includes("CPSC 313")}
    320: ${coreCPSC.includes("CPSC 320")}


    CPSC electives:

    ${cpscElectives}


    Bridging module:

    ${bridgingModule}

    EXTRA courses:
    NOTE: This currently does not populate courses.
    `
}

exports.GradCheck = retVal;