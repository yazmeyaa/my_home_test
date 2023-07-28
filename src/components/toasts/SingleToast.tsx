import { Toast, toastStore } from "../../stores/toast";

export const SingleToast = ({ description, title, kind, id }: Toast) => {

    function handleCloseButton() {
        toastStore.removeToastById(id)
    }

    return (
        <div className={`toast toast_${kind}`}>
            <strong>{title}</strong>
            <button onClick={handleCloseButton} className="close_button">X</button>
            <p>{description}</p>
        </div>
    )
}