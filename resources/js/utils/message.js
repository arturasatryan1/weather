import {message} from "antd";

export const Message = (MessageType, text, duration) => {
    if (MessageType === "danger") {
        message.error(text, duration ? duration : 5.0);
    } else if (MessageType === "success") {
        message.success(text, duration ? duration : 2.5);
    }
};
