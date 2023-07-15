export default function Footer() {
    const anoAtual = new Date().getFullYear();

    return (
        <>
            <div className="text-dark fs-6 border-top mx-5 d-flex flex-column align-items-center">
                <div>© {anoAtual} - Instituto Jurema de Ensino</div>
                <div>Desenvolvido por <a className="text-dark fw-medium text-decoration-none" target="_blank" href="https://github.com/matheusg1">Matheus G.</a></div>
            </div>
        </>
    )
}