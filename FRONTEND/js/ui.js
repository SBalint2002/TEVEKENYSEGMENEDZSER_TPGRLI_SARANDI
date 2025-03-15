export function getColorByType(type) {
    switch (type) {
        case "Work":
            return "bg-primary";
        case "Study":
            return "bg-secondary";
        case "Exercise":
            return "bg-success";
        case "Hobby":
            return "bg-danger";
        case "Social":
            return "bg-warning";
        case "Relax":
            return "bg-info";
        case "Eat":
            return "bg-light";
        case "Sleep":
            return "bg-dark";
        default:
            return "bg-secondary";
    }
}

export function showToast(msg, color) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add("show", color, "text-light", "p-3", "rounded");
    setTimeout(() => {
        toast.classList.remove("show", color, "text-light", "p-3", "rounded");
    }, 5000);
}