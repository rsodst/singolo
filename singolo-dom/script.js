class PageNavigator {
    constructor() {
        this._initialize();

        let pageNavigator = document.getElementById('pageNavigator');

        let menuItems = Array.from(pageNavigator.childNodes)
            .filter(p => p.className == 'header__menu__item');

        menuItems[0].classList.add('selected');

        menuItems.forEach(element => {

            element.onclick = () => {

                let section = this._sections.find(p => {
                    if (p.id == element.innerText) {
                        menuItems.forEach(p => {
                            if (p.innerText != element.innerText) {
                                p.classList.remove('selected');
                            }
                        });

                        element.classList.add('selected');
                        return p;
                    }
                });

                window.scroll({
                    top: section.offsetTop - pageNavigator.clientHeight,
                    behavior: 'smooth'
                });

            };

        });

        window.onscroll = () => {
            menuItems.forEach(item => {

                let section = this._sections.find(p => {
                    if (p.id == item.innerText) {
                        return p;
                    }
                });

                let offsetTop = Math.floor(section.getBoundingClientRect().y);

                if ((offsetTop > 63 && offsetTop < 220) || offsetTop == 0) {

                    item.classList.add('selected');

                    menuItems.forEach(p => {
                        if (p.innerText != item.innerText) {
                            p.classList.remove('selected');
                        }
                    });
                }
            });
        };

    }
    _initialize() {
        this._sections = [
            document.getElementById('HOME'),
            document.getElementById('SERVICES'),
            document.getElementById('PORTFOLIO'),
            document.getElementById('ABOUT'),
            document.getElementById('CONTACT'),
        ];
    }
}

class Slider {
    constructor() {
        let slider = document.getElementById('slider');

        [...slider.childNodes]
        .find(p => {
            if (p.className == 'slider__controls__arrow left') return p;
        }).onclick = () => {
            this._showPrevElement();
        };

        [...slider.childNodes]
        .find(p => {
            if (p.className == 'slider__controls__arrow right') return p;
        }).onclick = () => {
            this._showNextElement();
        };

        this.items = [...slider.childNodes].filter(p => {
            if (p.className == 'slider__content') {
                return p;
            }
        });

        this.items.slice(1).forEach(element => {
            this._hide(element);
        });

        this.current = 0;
    }

    _showNextElement() {
        this._hide(this.items[Math.abs(this.current)]);
        this.current = (this.current + 1) % this.items.length;
        this._show(this.items[Math.abs(this.current)]);
    }

    _showPrevElement() {
        this._hide(this.items[Math.abs(this.current)]);
        this.current = (this.current - 1) % this.items.length;
        this._show(this.items[Math.abs(this.current)]);
    }

    _hide(element) {
        element.classList.add('hidden');
        element.style.visibility = "hidden";
    }

    _show(element) {
        element.classList.remove('hidden');
        element.classList.add('visible');
        element.style.visibility = "visible";
    }

}

class PhoneDisplay {
    constructor() {
        let phoneIds = [
            'iphone-vert-display',
            'iphone-horizon-display',
            'iphone1-display',
            'iphone-center-display',
            'iphone2-display',
        ];

        phoneIds.forEach(p => {
            let phoneElement = document.getElementById(p);

            phoneElement.onclick = () => {
                this._switchDisplay(phoneElement);
            };

            phoneElement.onclick = () => {
                this._switchDisplay(phoneElement);
            };
        });
    }

    _switchDisplay(display) {

        if (display.enabled == undefined) {
            display.enabled = true;
        }

        if (display.enabled) {
            display.enabled = false;
            display.classList.add('disabled');
        } else {
            display.enabled = true;
            display.classList.remove('disabled');
        }
    }
}

class Portfolio {
    constructor() {
        this._portfolioTags = [...document.getElementById('portfolio_tags').childNodes];

        this._portfolioTags[1].classList.add('selected');

        this._portfolioTags.forEach((element, i) => {
            element.onclick = () => {
                element.classList.add("selected");
                this._shuffle(i);
                this._portfolioTags.forEach(p => {
                    if (p.innerText != element.innerText && p.classList) {
                        p.classList.remove('selected');
                    }
                });
            };
        });

        let portfolioImages = [...document.getElementById('portfolio_images').childNodes].filter(p => p.tagName == 'IMG');

        portfolioImages.forEach((element, j) => {
            element.onclick = () => {
                element.classList.add("selected");
                portfolioImages.forEach((p, i) => {
                    if (i != j && p.classList) {
                        p.classList.remove('selected');
                    }
                });
            };
        });

    }

    _shuffle(shift) {
        let length = 12;

        let portfolioImages = [...document.getElementById('portfolio_images').childNodes];

        portfolioImages.filter(p => p.tagName == 'IMG')
            .forEach((p, i) => {
                let srcId = (i + shift) % length;
                srcId = srcId == 0 ? length : srcId;
                p.src = `assets/img/portfolio-${srcId}.jpg`;
            });

    }
}

class FormInterceptor {

    disableform(form) {
        var f = form.getElementsByTagName('input');
        for (var i = 0; i < f.length; i++)
            f[i].disabled = true;

        var f = form.getElementsByTagName('button');
        for (var i = 0; i < f.length; i++)
            f[i].disabled = true;

        var f = form.getElementsByTagName('textarea');
        for (var i = 0; i < f.length; i++)
            f[i].disabled = true;
    }

    enableform(form) {
        var f = form.getElementsByTagName('input');
        for (var i = 0; i < f.length; i++)
            f[i].disabled = false;

        var f = form.getElementsByTagName('button');
        for (var i = 0; i < f.length; i++)
            f[i].disabled = false;

        var f = form.getElementsByTagName('textarea');
        for (var i = 0; i < f.length; i++)
            f[i].disabled = false;
    }

    constructor() {
        let toastArea = document.getElementById('toast-area');

        toastArea.style.visibility = 'hidden';

        let form = document.getElementById('form');

        let processForm = (e) => {
            if (e.preventDefault) e.preventDefault();

            toastArea.style.visibility = 'visible';

            let message = 'Без темы';
            let subject = document.getElementById('subject');

            if (subject.value == 'Singolo') {
                message = 'Тема: Singolo';
            } else if (subject.value.length > 0) {
                message = `\nТема: ${subject.value}`;
            }

            let describe = document.getElementById('describe');

            if (describe.value == 'Portfolio project') {
                message += '\nОписание: Singolo';
            } else if (describe.value.length > 0) {
                message += `\nОписание: ${describe.value}`;
            } else {
                message += '\nБез описания';
            }

            toastNotification.push('Письмо отправлено', message, () => {
                formInterceptor.enableform(form);
                toastArea.style.visibility = 'hidden';
            });

            formInterceptor.disableform(form);

            return false;
        }

        if (form.attachEvent) {
            form.attachEvent("submit", processForm);
        } else {
            form.addEventListener("submit", processForm);
        }

    }
}

let pageNavigator = new PageNavigator();
let slider = new Slider();
let phoneDisplay = new PhoneDisplay();
let portfolio = new Portfolio();
let formInterceptor = new FormInterceptor();