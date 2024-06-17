import {render} from "@testing-library/react";
import {Provider} from "effector-react";

// component: ReactNode
// options object with params
export const componentRender = (component, options) => {

    const {scope} = options

    return render(<Provider value={scope}>{component}</Provider>)
}
