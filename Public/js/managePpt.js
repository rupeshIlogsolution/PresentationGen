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
                html = html + `<th scope='row'>${i+1}</t > `;
                html = html + "<td>hkh</td > ";
                html = html + '<td>23</td>';
            }
            html = html + ' </tr>';
        }

        document.getElementById('table_body').innerHTML = html;
    })();

const dragArea = document.querySelector('#table_body');
let getData = new Sortable(dragArea, {
    animation: 350,
});