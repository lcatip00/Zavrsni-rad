import React from 'react'

const Pagination =  (props) => {

    // izracunaj broj stranica i spremi ih uniz
    const maxPageNumbers = Math.floor((props.nuberOfPosts - 1) /15)+1;
    const pageNumbers = [];

    for (let i =1; i<= maxPageNumbers; i++){
        pageNumbers.push(i)
    }

    // const getNumberOfPages = () => {
    //     console.log("Racuna mi",props.nuberOfPosts -1 / 20)
    //     console.log("cijeli broj: ",Math.floor((props.nuberOfPosts - 1) /20)+1)
    //     // post number oduzmem jedan jer mmi ovakav nacin racunanja nece raditi u slucaju da je broj djeliv s 20
    //     //od broja postova oduzmem 1, i podjelim s 20 kako bi dobial broj stranica
    //     //floor mi zaokruzuje broj, tj mice mi ostatak, kako to radi moram 
    //     //rezultat uvecati za 1 i onda tek dobijem tocan broj stranica.
    //     return Math.floor((props.nuberOfPosts - 1) /20)+1;
    // }

    const handleNextpage = (e) => {
        e.preventDefault()
        if (props.nextUrl != null){
            props.setCurrentPage(props.currentPage +1)
            props.setUrl(props.nextUrl)
        }
    }

    const handlePrevPage = (e) => {
        e.preventDefault()
        if (props.prevUrl != null){
            props.setCurrentPage(props.currentPage -1)
            props.setUrl(props.prevUrl)
        }
    }

    const handlePageNumberClick = (e) => {
        e.preventDefault()
        //prvo postavimo current page da iz njega izvucemo koji je url
        //current page je broj na koji je kliknuo korisnik
        props.setCurrentPage(e.target.id)

        //na osnovu toga koji se broj klikne mjenja se nastavak za url
        //formula je br page -1 pomnozeno s 20, jer onda dobijamo po tome linkove 
        //trebam dohvatiti koji je broj kliknut i nekako na osnovu toga na base url
        const count = ((parseInt(e.target.id)-1) * 15)
        const urlExstension = "?limit=15&offset="+ count
        const najnoviji = props.baseUrl.concat(urlExstension)
        props.setUrl(najnoviji)
        //postaviti na dodatak, sve spremiti u pravi url
        //promjeni current page isto, vise nisam sigurna oce li mi to trebati?
        props.setCurrentPage(e.target.id)
    }

    return (
        // {/* pagionation  */}
        <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" onClick={handlePrevPage} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    {
                        pageNumbers && pageNumbers.map(pageNumber => (
                            <li class="page-item" key={pageNumber}>
                                <a class="page-link" onClick={handlePageNumberClick} id={pageNumber}>{pageNumber}</a>
                            </li>
                        ))
                    }
                    <li class="page-item">
                        <a class="page-link" onClick={handleNextpage} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;