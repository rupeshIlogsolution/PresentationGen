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
        document.querySelector('#video_src').innerHTML = `
        <source  type="video/mp4" src='/video/${pptData.presentationVideo}'/>
        Your browser does not support the video tag.`
    }
)()