
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API } from '../config/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([EffectCoverflow, Navigation, Pagination]);

export const ChampionDetail = () => {
    const location = useLocation();
    const [skins, setSkins] = useState([]);
    // setSkin(location.state);
    console.log(location.state);
    const { id, img, name, tags, title, desc } = location.state;

    // () => {
    // const capitalise = name => `${name.charAt(0).toUpperCase() + name.slice(1)}`;
    // console.log(capitalise);
    //     // const capitalise = name => `${name.charAt(0).toUpperCase() + name.slice(1)}`;
    //     // console.log(capitalise);
    //     fetch(`${API.GET_CHAMPIONS}/${name}.json`).then(res => {
    //         const data = res.json();
    //         console.log(data);
    //         return data;
    //     }).then(data => {
    //         setSkins(data.data[name].skins)
    //     })

    useEffect(() => {
        // userEffect 내부에서 async 를 적용하려면 따로 함수를 정의해줘야 한다. 그리고 그 따로 정의된 함수를 화살표 함수를 이용해서 즉시실행을 해야 하는데 화살표 함수를 사용할 경우 그 함수를 괄호 '()' 로 묶고 맨뒤에 (); 이렇게 사용해줘야 한다.
        (async () => {
            const response = await fetch(`${API.GET_CHAMPIONS}/${id}.json`);
            const data = await response.json();
            setSkins(data.data[id].skins)

        })();
    }, [id])



    return (
        <div className="champs-detail">
            <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${img}`} alt="img" />
            <h2>{name}</h2>
            <h3>{title}</h3>
            <h3>{tags.join(',')}</h3>
            <h3>{desc}</h3>
            <h3>Skins</h3>
            <div className="skil-img">

                <Swiper
                    style={{ height: '350px', padding: '30px' }}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    spaceBetween={10}
                    slidesPerView={3}
                    coverflowEffect={{
                        rotate: 70,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false
                    }}
                    pagination={{ clickable: true }}
                >
                    {skins.map((skin, index) => {
                        return (

                            <SwiperSlide key={index}>
                                <img src={`${API.GET_SKINS}/${id}_${skin.num}.jpg`} alt={`${skin.name}`} />
                            </SwiperSlide>

                        )
                    }

                    )}
                </Swiper>
            </div>
        </div>
    )
}
// http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Braum.png