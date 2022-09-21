/* ******************************************************************************
 * FORMS
 *******************************************************************************/

function requiredMsg(msg, overallmsg) {
    return overallmsg = overallmsg === '' ? msg : overallmsg + "\n" + msg
}

export {
    requiredMsg
}
