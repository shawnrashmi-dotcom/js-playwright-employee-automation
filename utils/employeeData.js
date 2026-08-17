const fs = require('fs');
const path = require('path');

const employeeDataPath = path.join(
    process.cwd(),
    'fixtures',
    'employee.json'
);

function getNextEmployeeCode() {
    const data = JSON.parse(
        fs.readFileSync(employeeDataPath, 'utf8')
    );

    const currentCode =
        Number(data.ValidEmployeeDetails.employeeCode);

    const nextCode = currentCode + 1;

    // Save the new code immediately
    data.ValidEmployeeDetails.employeeCode = nextCode;

    fs.writeFileSync(
        employeeDataPath,
        JSON.stringify(data, null, 2)
    );

    return nextCode;
}

module.exports = {
    getNextEmployeeCode
};