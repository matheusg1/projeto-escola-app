import React from 'react'
import img1Carousel1 from '../../assets/carousel/img1.jpg'
import img1Carousel2 from '../../assets/carousel/img2.jpg'
import img1Carousel3 from '../../assets/carousel/img3.jpg'

export default function Inicio() {
    return (
        <>
            <div className='d-flex justify-content-around mt-5'>
                <div id="carouselExampleCaptions" class="carousel slide col-7">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={img1Carousel1} class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Mussum Ipsum, cacilds vidis litro abertis.</h5>
                                <p>Diuretics paradis num copo é motivis de denguis.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src={img1Carousel2} class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Mauris nec dolor in eros commodo tempor.</h5>
                                <p>Copo furadis é disculpa de bebadis, arcu quam euismod magna.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src={img1Carousel3} class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>A ordem dos tratores não altera o pão duris.</h5>
                                <p>Casamentiss faiz malandris se pirulitá.</p>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div className='col-4'>
                    <div className='display-5 fw-bold'>Mussum Ipsum, cacilds vidis</div>
                    <div className='fs-3'>Mussum Ipsum, cacilds vidis litro abertis. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Atirei o pau no gatis, per gatis num morreus. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si num tem leite então bota uma pinga aí cumpadi!
                        Diuretics paradis num copo é motivis de denguis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Mais vale um bebadis conhecidiss, que um alcoolatra anonimis. Casamentiss faiz malandris se pirulitá.
                        A ordem dos tratores não altera o pão duris. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.</div>
                </div>
            </div>
        </>
    )
}