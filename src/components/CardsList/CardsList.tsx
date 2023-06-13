import React from "react";
import { CardPostTypes } from "../CardPost";
import Card from "../CardPost";


const cardPosts = [
    {
        id: 0,
        title: 'Как упростить авиапутешествия по Европе',
        text: 'Европейские самолеты пересекают в небе десятки границ: авиакомпании хотят упростить путешествия и рассчитывают на "Единое европейское небо". По словам представителей авиационной промышленности, "Единое европейское небо" может сократить выбросы и уменьшить задержки.Но что это такое и насколько эффективным и экологичным оно будет на самом деле?',
        image: 'https://static.euronews.com/articles/stories/07/49/90/02/773x435_cmsv2_0873e053-ec92-5626-b060-8e1d63adcd7e-7499002.jpg',
        type: CardPostTypes.Large,
        date: '31.03.2023',
},
    {
        id: 1,
        title: 'Как упростить авиапутешествия по Европе',
        image: 'https://static.euronews.com/articles/stories/07/49/90/02/773x435_cmsv2_0873e053-ec92-5626-b060-8e1d63adcd7e-7499002.jpg',
        type: CardPostTypes.Medium,
        date: '31.03.2023',
    },
    {
        id: 2,
        title: 'Как упростить авиапутешествия по Европе',
        image: 'https://static.euronews.com/articles/stories/07/49/90/02/773x435_cmsv2_0873e053-ec92-5626-b060-8e1d63adcd7e-7499002.jpg',
        type: CardPostTypes.Small,
        date: '31.03.2023',
    },
]

const CardsList: React.FC = () => {
    return (
        <div>
            {cardPosts.map((post) => (
                <Card key={post.id} {...post} />
            ))}
        </div>
    );
};

export default CardsList;