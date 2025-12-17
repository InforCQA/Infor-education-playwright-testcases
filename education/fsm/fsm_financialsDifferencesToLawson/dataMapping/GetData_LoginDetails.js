import config from "../../plan/FSMFinancialsDifferencesToLawson.spec";

const loginCnxt = JSON.parse(JSON.stringify(require("../../../commons/context/LoginContext.json")));

class GetData_LoginDetails {

    static async getCSLoginDetailsContext() {

        loginCnxt.BASE_URL=config.BASE_URL;
        loginCnxt.INSTRUCTOR=config.INSTRUCTOR;
        loginCnxt.USER_NAME=config.USER_NAME;
        loginCnxt.STUDENT_NAME=config.STUDENT_NAME;
        loginCnxt.EMPLOYEE_ID=config.EMPLOYEE_ID;
        loginCnxt.PASSWORD=config.PASSWORD;
    }
}

export default GetData_LoginDetails;
