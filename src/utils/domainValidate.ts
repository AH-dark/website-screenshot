import { allowDomains } from "../global";

const validate = (domain: string) => {
    const realDomain = domain.split("/")[0];
    for (const key in allowDomains) {
        console.log("Checking domain in", allowDomains[key]);
        if (key === realDomain) {
            return true;
        }
    }
    return false;
};

export default validate;
