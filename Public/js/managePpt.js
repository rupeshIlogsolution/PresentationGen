let globalVar;

let pptid = localStorage.getItem('pptId');
(
    async function generateable() {
        const dakbj = await fetch(`http://localhost:2800/api/getOnePresentation/${pptid}`)
        const jk = await dakbj.json()
        globalVar = jk
        console.log(jk)

        document.getElementById('pptTitle').innerHTML = jk.title;

        let html = '';
        for (let i = 0; i < jk.presentationImg.length; i++) {
            html = html + "<tr class='childDiv' >";
            for (let j = 0; j < 1; j++) {
                html = html + `<th scope='row'>${i + 1}</t > `;
                html = html + `<td>${jk.presentationImg[i]}</td >`;
                html = html + `<td class='action_td'>
                <div class='image_preview'> <img src='../image/Uploaded/${jk.presentationImg[i]}'/></div>
                <div class='delete_icons'>
                <img src='https://lh3.googleusercontent.com/G2jzG8a6-GAA4yhxx3XMJfPXsm6_pluyeEWKr9I5swUGF62d2xo_Qg3Kdnu00HAmDQ' alt='Delete Icons'/>
</div>
                </td>`;
            }
            html = html + ' </tr>';
        }

        document.getElementById('table_body').innerHTML = html;
    })();

const dragArea = document.querySelector('#table_body');
let getData = new Sortable(dragArea, {
    animation: 350,
});