let ToastNotification = (root) => {

    let notificationArea = document.getElementsByTagName(root)[0];

    let create = (title, content, callback) => {

        let notification = document.createElement("notification-toast");
        let notificationHeader = document.createElement("notification-toast-header");
        let notificationToastTitle = document.createElement("notification-toast-title");
        let notificationToastCloseButton = document.createElement("notification-toast-close-button");
        let notificationToastContent = document.createElement("notification-toast-content");

        notificationToastTitle.innerText = title;
        notificationToastContent.innerText = content;

        notificationHeader.appendChild(notificationToastTitle);

        notificationToastCloseButton.innerText = "Закрыть";

        notificationToastCloseButton.onclick = () => {
            hide(notification);
            if (callback) {
                callback();
            }
        };


        notification.appendChild(notificationHeader);
        notification.appendChild(notificationToastContent);

        notification.appendChild(notificationToastCloseButton);

        notification.classList.add("notification-toast-hide");

        notificationArea.prepend(notification);

        return notification;
    };

    let hide = (notification) => {
        notification.classList.add("notification-toast-hide");
    };

    let show = (notification) => {
        notification.classList.remove("notification-toast-hide");
    };

    let push = (title, content, callback) => {
        let notification = create(title, content, callback);

        window.setTimeout(() => {
            show(notification);
        }, 100);

    };

    return {
        push: (title, content, callback) => {
            push(title, content, callback);
        }
    };
};

let toastNotification = ToastNotification("notification-toast-area");