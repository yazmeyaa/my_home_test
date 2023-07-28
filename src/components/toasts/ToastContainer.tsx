import { observer } from "mobx-react";
import { ToastStore } from "../../stores/toast";
import { createPortal } from "react-dom";
import { SingleToast } from "./SingleToast";

type ToastContainerProps = {
    toasts: ToastStore
}

export const ToastContainer = observer(({ toasts }: ToastContainerProps) => {
    
    const element = document.getElementById('toast_container')
    if (!element) return null

    return createPortal(
    <div className="toast_container">
        {toasts.toastList.map(item => <SingleToast key={item.id} {...item}/>)}
    </div>, element)

})