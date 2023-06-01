import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
    getData() {
        return [
            {
                itemImageSrc: 'https://www.coca-cola.com/content/dam/onexp/vn/home-image/nutriboost/img-resized/hero-banner/VN_VI_Nutriboost%20VN_FB%20Cover%20without%20Logo%20copy-desktop.jpg',
                alt: 'Description for Image 1',
                title: 'NutriFood'
            },
            {
                itemImageSrc: 'https://i.ytimg.com/vi/ahnFy-Vorug/maxresdefault.jpg',
                alt: 'Description for Image 2',
                title: 'Coca Cola trúng thưởng'
            },
            {
                itemImageSrc: 'https://beptruong.edu.vn/wp-content/uploads/2021/01/Neptune-Light.jpg',
                alt: 'Description for Image 3',
                title: 'Dầu ăn Nepture'
            },
            {
                itemImageSrc: 'https://i.ytimg.com/vi/R0HMEqL_zVA/maxresdefault.jpg',
                alt: 'Description for Image 4',
                title: 'Dầu ăn Simply'
            },
            {
                itemImageSrc: 'https://baodaklak.vn/file/fb9e3a03798789de0179a1704dea238e/012023/1_20230113160229.png',
                alt: 'Description for Image 5',
                title: 'Larue diện mạo mới'
            },
            {
                itemImageSrc: 'https://i.ytimg.com/vi/aVpwCYN4l8I/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGB0gPCh_MA8=&rs=AOn4CLAv1tQCGYQScfKjhWusnB4UHGdbsA',
                alt: 'Description for Image 6',
                title: 'Larue trúng thưởng'
            },
            {
                itemImageSrc: 'https://i.ytimg.com/vi/_7ADbxV4v0M/maxresdefault.jpg',
                alt: 'Description for Image 7',
                title: 'Sữa Vinamilk'
            },
            {
                itemImageSrc: 'https://i.ytimg.com/vi/xK0rbafmUcc/maxresdefault.jpg',
                alt: 'Description for Image 8',
                title: 'Sữa Vinamilk'
            },
            {
                itemImageSrc: 'https://atp.vn/wp-content/uploads/2022/03/milo-chien-dich-quang-cao-nang-dong-viet-nam-1024x630.jpg',
                alt: 'Description for Image 9',
                title: 'Sữa Milo'
            },
            {
                itemImageSrc: 'https://d1v5l30g8wuyvb.cloudfront.net/thp.com.vn/uploads/2023/04/17135838/thumbnail.png',
                alt: 'Description for Image 10',
                title: 'Title 10'
            },
            {
                itemImageSrc: 'https://cdn.brvn.vn/topics/1280px/2023/330257_330257-oreo-cover_1676286367.jpg',
                alt: 'Description for Image 11',
                title: 'Title 11'
            },
            {
                itemImageSrc: 'https://ngaocontent.com/wp-content/uploads/2021/10/chien-luoc-truyen-thong-cua-sting-3.png',
                alt: 'Description for Image 12',
                title: 'Title 12'
            },
            {
                itemImageSrc: 'https://files.garena.vn/ff-admin-tools/public/otf/37c9ce4f-9fbb-4227-a05b-69d6b467de38',
                alt: 'Description for Image 13',
                title: 'Title 13'
            },
            {
                itemImageSrc: 'https://media.licdn.com/dms/image/C5622AQG3Yoq0mBXZvg/feedshare-shrink_800/0/1637567190399?e=2147483647&v=beta&t=XPu0tvzdGJP-mpJy0jWQIavE_PgiAO2gSparIJN3fPM',
                alt: 'Description for Image 14',
                title: 'Title 14'
            }
        ];
    }

    getImages() {
        return Promise.resolve(this.getData());
    }
};
