let urlVal = 'http://localhost:2800';
// let urlVal='https://presentation.awlinternational.com';


// It should be the same transition time of the sections
const body = document.querySelector('body');
// Add child elements in .section-stick as number of sections exist
(
    async function pptData() {
        let urlTitle = window.location.href.split('/')
        const dakbj = await fetch(`${urlVal}/api/getOneVideoPresentation/${urlTitle[4]}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userId': 'default',
            }
        })
        const pptData = await dakbj.json()
        console.log(pptData)
      

        document.querySelector('#video_src').innerHTML=`
        <source  type="video/mp4" src='/video/${pptData.presentationVideo}'/>
        Your browser does not support the video tag.
        `
    }
)()

// let sectionStickPerUnit = (window.screen.height / 2);

// window.onscroll = () => {
//     if (startFlag) {
//         const scrollDown = window.scrollY >= initialScroll;
//         let scrollLimit = qty >= 1 && qty <= sectionsQty;
//         if (scrollLimit) {
//             body.style.overflowY = 'hidden';
//             if (scrollDown && qty < sectionsQty) {
//                 main = document.querySelector(`section#s${qty}`);
//                 next = document.querySelector(`section#s${qty + 1}`);
//                 main.style.transform = 'translateY(-100vh)';
//                 next.style.transform = 'translateY(0)';
//                 qty++;
//                 sectionStickPerUnit = sectionStickPerUnit - 45;
//                 console.log(sectionStickPerUnit)
//                 sectionStickUnit.style.top = sectionStickPerUnit + 'px';
//             } else if (!scrollDown && qty > 1) {
//                 main = document.querySelector(`section#s${qty - 1}`);
//                 next = document.querySelector(`section#s${qty}`);
//                 main.style.transform = 'translateY(0)';
//                 next.style.transform = 'translateY(100vh)';
//                 qty--;
//                 sectionStickPerUnit = sectionStickPerUnit + 45;
//                 sectionStickUnit.style.top = sectionStickPerUnit + 'px';
//             }
//             if(qty==1){
//                 document.querySelector('.pptScrollTop').style.transform = 'translateY(200%)'
//             }
//             else{
//                 document.querySelector('.pptScrollTop').style.transform = 'translateY(0%)'
//             }
//         }
//         setTimeout(() => {
//             initialScroll = window.scrollY;
//             startFlag = true;
//             body.style.overflowY = 'scroll';
//         }, 600);
//         startFlag = false;
//     }
//     window.scroll(0, window.screen.height);
// };
// // --------------------- Handle Click to Scroll------------------------------
// function handleScrollToTp() {
//     main = document.querySelector(`section#s${qty}`);
//     next = document.querySelector(`section#s1`);
//     main.style.transform = 'translateY(100vh)';
//     next.style.transform = 'translateY(0)';

//     qty = 1;
//     sectionStickUnit.style.top = (window.screen.height / 2) + 'px';
//     sectionStickPerUnit = (window.screen.height / 2);

//     for (let i = 1; i <= sectionsQty; i++) {
//         let sectionTag = document.querySelector(`section#s${i}`)
//         if (sectionTag.style.transform === 'translateY(-100vh)') {
//             document.querySelector(`section#s${i}`).style.transform = 'translateY(100vh)';
//         }
//     }
//     if (qty == 1) {
//             document.querySelector('.pptScrollTop').style.transform = 'translateY(200%)'
//     }

// }


// -------------------------Handle Click Stick ---------------------------

// const handleClickStick = (prop_id) => {
//     let id = Number(prop_id)

//     if (id > qty) {
//         // let now = document.querySelector(`section#s${qty}`);
//         // now.style.transform = 'translateY(-100vh)';
//         //     let current = document.querySelector(`section#s${id}`);
//         //     current.style.transform = 'translateY(0vh)';
//         // document.getElementById(`s${id}`).style.transform = 'translateY(0vh)';
//         // for(let i=id;i>sectionsQty;i--){
//         //     document.getElementById(`s${i}`).style.transform = 'translateY(-100vh)';
//         // }
//         sectionStickPerUnit = sectionStickPerUnit - ((id - qty) * 45);
//         sectionStickUnit.style.top = sectionStickPerUnit + 'px';
//     }
//     else {
//         // let now = document.querySelector(`section#s${qty}`);
//         // now.style.transform = 'translateY(100vh)';
//         //     let current = document.querySelector(`section#s${id}`);
//         //     current.style.transform = 'translateY(0vh)';
//         // document.getElementById(`s${id}`).style.transform = 'translateY(0vh)';
//         // for(let i=id+1;i<=sectionsQty;i++){
//         //     console.log(`document.getElementById(s${i})`)
//         //     document.getElementById(`s${i}`).style.transform = 'translateY(100vh)';
//         // }
//         sectionStickPerUnit = sectionStickPerUnit + ((qty - id) * 45);
//         sectionStickUnit.style.top = sectionStickPerUnit + 'px';
//     }

//     for (let i = 1; i <= sectionsQty; i++) {
//         if (id === i) {
//             setTimeout(() => {
//                 document.getElementById(`s${id}`).style.transform = 'translateY(0vh)';
//             }, 200)
//         }
//         else if (i > id) {
//             document.querySelector(`section#s${i}`).style.transform = 'translateY(100vh)';
            
//         }
//         else if (i < id) {
//             document.querySelector(`section#s${i}`).style.transform = 'translateY(-100vh)';
//         }
//     }
//     qty = id;
//     if(qty==1){
//         document.querySelector('.pptScrollTop').style.transform = 'translateY(200%)'
//     }
//     else{
//         document.querySelector('.pptScrollTop').style.transform = 'translateY(0%)'
//     }
// }


