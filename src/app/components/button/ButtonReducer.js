export function buttonString1 (state = "", action) { switch (action.type) { case "BUTTON_CH_STRING1": return action.newValue; default: return state; } }
export function buttonString2 (state = "", action) { switch (action.type) { case "BUTTON_CH_STRING2": return action.newValue; default: return state; } }