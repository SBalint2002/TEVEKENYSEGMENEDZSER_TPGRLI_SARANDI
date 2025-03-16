import {ToastType} from "../models/ToastType.js";

export function getColorByType(type) {
    const colors = {
        "Work": "bg-primary",
        "Study": "bg-secondary",
        "Exercise": "bg-success",
        "Hobby": "bg-danger",
        "Social": "bg-warning",
        "Relax": "bg-info",
        "Eat": "bg-primary",
        "Sleep": "bg-dark"
    };
    return colors[type] || "bg-secondary";
}

let activeToastTimeout = null;

function configureToast(msg, color, toastType) {
    const toast = document.getElementById('toast');
    const toastBody = toast.querySelector('.toast-body');
    const successToastImage = document.getElementById('success-toast-image');
    const errorToastImage = document.getElementById('error-toast-image');
    const crazyToastImage = document.getElementById('crazy-toast-image');

    if (toast && toastBody && successToastImage && errorToastImage && crazyToastImage) {
        successToastImage.style.display = toastType === ToastType.SUCCESS ? 'block' : 'none';
        errorToastImage.style.display = toastType === ToastType.ALERT ? 'block' : 'none';
        crazyToastImage.style.display = toastType !== ToastType.SUCCESS && toastType !== ToastType.ALERT ? 'block' : 'none';

        toastBody.textContent = msg;
        toast.classList.remove("hide");
        toast.classList.add("show", color, "text-light", "p-3", "rounded");
    }
    return toast;
}

function resetToast(toast, color) {
    toast.classList.remove("show", color, "text-light", "p-3", "rounded");
    toast.classList.add("hide");

    const successToastImage = document.getElementById('success-toast-image');
    const errorToastImage = document.getElementById('error-toast-image');
    const crazyToastImage = document.getElementById('crazy-toast-image');

    if (successToastImage) successToastImage.style.display = 'none';
    if (errorToastImage) errorToastImage.style.display = 'none';
    if (crazyToastImage) crazyToastImage.style.display = 'none';
}

export function showToast(msg, color, toastType) {
    const toast = configureToast(msg, color, toastType);

    if (activeToastTimeout) {
        clearTimeout(activeToastTimeout);
    }

    activeToastTimeout = setTimeout(() => {
        resetToast(toast, color);
    }, 5000);
}

export function showToastWithRedirect(msg, color, target, toastType) {
    const toast = configureToast(msg, color, toastType);

    if (activeToastTimeout) {
        clearTimeout(activeToastTimeout);
    }

    activeToastTimeout = setTimeout(() => {
        resetToast(toast, color);
        window.open(target, '_self');
    }, 5000);
}
