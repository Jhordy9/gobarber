import React, { useState, useEffect } from 'react';

import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ContentSlider, Provider } from './styles';
import api from '../../services/api';

interface ProviderData {
  provider_id: string;
  name: string;
  avatar_url: string;
  category: string;
}

const ComponentSlider: React.FC = () => {
  const [providers, setProviders] = useState<ProviderData[]>([]);

  useEffect(() => {
    async function loadProviders(): Promise<void> {
      const { data } = await api.get<ProviderData[]>('/providers');

      const listProviders = data.filter((dt) => {
        return dt.category === 'Barbeiro';
      });

      setProviders(listProviders);
    }

    loadProviders();
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    className: 'SliderDiv',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <ContentSlider>
      <Slider {...settings}>
        {providers.map((dt) => (
          <Provider key={dt.provider_id}>
            <img src={dt.avatar_url} alt={dt.name} />
            <strong>{dt.name}</strong>
          </Provider>
        ))}
      </Slider>
    </ContentSlider>
  );
};

export default ComponentSlider;
