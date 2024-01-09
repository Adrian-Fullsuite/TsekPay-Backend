function sanitizeInput(input){
    if (typeof input === "string"){
        return input.replace(/[^a-zA-Z0-9]/g, "");
    } else{
        return String(input.replace(/[^a-zA-Z0-9]/g, ""));
    }
};

export {
    sanitizeInput
};