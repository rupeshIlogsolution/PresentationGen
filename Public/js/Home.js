// let urlVal = 'http://localhost:2800';
let urlVal='https://presentation.awlinternational.com';


// It should be the same transition time of the sections
const body = document.querySelector('body');
let sectionsQty;
let sectionStick = document.querySelector('.stick_container');
let sectionStickMajor = document.querySelector('.section-stick');
sectionStickMajor.style.height = window.screen.height + 'px'
const sectionStickUnit = document.querySelector('.stick_container');
sectionStickUnit.style.position = 'absolute';
sectionStickUnit.style.top = (window.screen.height / 2) + 'px';

let startFlag = true;
let initialScroll = window.scrollY;
let qty = 1, main = null, next = null;

// Add child elements in .section-stick as number of sections exist
let count = 0;
(
    async function pptData() {
        let urlTitle = window.location.href.split('/')
        const dakbj = await fetch(`${urlVal}/api/getOnePresentation/${urlTitle[4]}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userId': 'default',
            }
        })
        const pptData = await dakbj.json()

        for (let i = 0; i < pptData.presentationImg.length; i++) {
            var div = document.createElement('section');
            div.id = `s${i + 1}`
            div.className = `sectionImgDiv`
            div.innerHTML = `<img src='/image/Uploaded/${pptData.presentationImg[i]}'/> `;
            document.querySelector('.layout').appendChild(div);
        }

        sectionsQty = pptData.presentationImg.length;
        Array(sectionsQty)
            .fill()
            .forEach(() => {
                sectionStick.innerHTML =
                    // sectionStick.innerHTML + `<div class="stick">${count + 1}</div>`;
                    sectionStick.innerHTML + `<div class="stick" onclick="handleClickStick(\'${count + 1}\')">${count + 1}</div>`;
                count++;
            });

    }
)()

let sectionStickPerUnit = (window.screen.height / 2);

window.onscroll = () => {
    if (startFlag) {
        const scrollDown = window.scrollY >= initialScroll;
        let scrollLimit = qty >= 1 && qty <= sectionsQty;
        if (scrollLimit) {
            body.style.overflowY = 'hidden';
            if (scrollDown && qty < sectionsQty) {
                main = document.querySelector(`section#s${qty}`);
                next = document.querySelector(`section#s${qty + 1}`);
                main.style.transform = 'translateY(-100vh)';
                next.style.transform = 'translateY(0)';
                qty++;
                sectionStickPerUnit = sectionStickPerUnit - 45;
                sectionStickUnit.style.top = sectionStickPerUnit + 'px';
            } else if (!scrollDown && qty > 1) {
                main = document.querySelector(`section#s${qty - 1}`);
                next = document.querySelector(`section#s${qty}`);
                main.style.transform = 'translateY(0)';
                next.style.transform = 'translateY(100vh)';
                qty--;
                sectionStickPerUnit = sectionStickPerUnit + 45;
                sectionStickUnit.style.top = sectionStickPerUnit + 'px';
            }
            if (qty == 1) {
                document.querySelector('.pptScrollTop').style.transform = 'translateY(200%)'
            }
            else {
                document.querySelector('.pptScrollTop').style.transform = 'translateY(0%)'
            }
        }
        setTimeout(() => {
            initialScroll = window.scrollY;
            startFlag = true;
            body.style.overflowY = 'scroll';
        }, 600);
        startFlag = false;
    }
    window.scroll(0, window.screen.height);
};
// --------------------- Handle Click to Scroll------------------------------
function handleScrollToTp() {
    main = document.querySelector(`section#s${qty}`);
    next = document.querySelector(`section#s1`);
    main.style.transform = 'translateY(100vh)';
    next.style.transform = 'translateY(0)';

    qty = 1;
    sectionStickUnit.style.top = (window.screen.height / 2) + 'px';
    sectionStickPerUnit = (window.screen.height / 2);

    for (let i = 1; i <= sectionsQty; i++) {
        let sectionTag = document.querySelector(`section#s${i}`)
        if (sectionTag.style.transform === 'translateY(-100vh)') {
            document.querySelector(`section#s${i}`).style.transform = 'translateY(100vh)';
        }
    }
    if (qty == 1) {
        document.querySelector('.pptScrollTop').style.transform = 'translateY(200%)'
    }

}


// -------------------------Handle Click Stick ---------------------------

const handleClickStick = (prop_id) => {
    let id = Number(prop_id)

    if (id > qty) {
        sectionStickPerUnit = sectionStickPerUnit - ((id - qty) * 45);
        sectionStickUnit.style.top = sectionStickPerUnit + 'px';
    }
    else {
        sectionStickPerUnit = sectionStickPerUnit + ((qty - id) * 45);
        sectionStickUnit.style.top = sectionStickPerUnit + 'px';
    }

    for (let i = 1; i <= sectionsQty; i++) {
        if (id === i) {
            setTimeout(() => {
                document.getElementById(`s${id}`).style.transform = 'translateY(0vh)';
            }, 200)
        }
        else if (i > id) {
            document.querySelector(`section#s${i}`).style.transform = 'translateY(100vh)';

        }
        else if (i < id) {
            document.querySelector(`section#s${i}`).style.transform = 'translateY(-100vh)';
        }
    }
    qty = id;
    if (qty == 1) {
        document.querySelector('.pptScrollTop').style.transform = 'translateY(200%)'
    }
    else {
        document.querySelector('.pptScrollTop').style.transform = 'translateY(0%)'
    }
}