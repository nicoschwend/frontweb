import React from 'react'
import pic from '../assets/imgs/calendario_base.jpg'
import pic1 from '../assets/imgs/click_agregar.jpg'
import pic2 from '../assets/imgs/click_evento.jpg'
import pic3 from '../assets/imgs/llenando_evento.jpg'
import pic4 from '../assets/imgs/crear_evento.jpg'
import pic5 from '../assets/imgs/evento_creado.jpg'
import { useState, useEffect } from 'react' 
import './carrusel.css'


const fotos = [pic, pic1, pic2, pic3, pic4, pic5];


export default function Carrusel2() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(currentIndex === fotos.length - 1) {
                setCurrentIndex(0);
            } 
            else {
                 setCurrentIndex(currentIndex + 1);
            }
        }, 2200)
        
        return () => clearInterval(intervalId);
    }, [currentIndex])

    return (
        <div>
            <p>
                <img src={fotos[currentIndex]} alt="Flujo de eventos" />
            </p>
        </div>

    )
}