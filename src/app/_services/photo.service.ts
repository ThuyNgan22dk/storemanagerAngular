import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
    getData() {
        return [
            {
                itemImageSrc: 'https://img.websosanh.vn/v2/users/review/images/danh-gia-bia-larue-dong-bia/jscud0l79685w.jpg',
                thumbnailImageSrc: 'https://img.websosanh.vn/v2/users/review/images/danh-gia-bia-larue-dong-bia/jscud0l79685w.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: 'https://i.ytimg.com/vi/LhLbs57Oe_A/maxresdefault.jpg',
                thumbnailImageSrc: 'https://i.ytimg.com/vi/LhLbs57Oe_A/maxresdefault.jpg',
                alt: 'Description for Image 2',
                title: 'Title 2'
            },
            {
                itemImageSrc: 'https://images2.thanhnien.vn/528068263637045248/2023/4/20/hinh-1-204-16819765510431459444215.jpeg',
                thumbnailImageSrc: 'https://images2.thanhnien.vn/528068263637045248/2023/4/20/hinh-1-204-16819765510431459444215.jpeg',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: 'https://baodanang.vn/dataimages/202010/original/images1586089_Tiger_Beer_thay___i_di_n_m_o_b_t_ph__h_n_nh_ng_v_n_gi__nguy_n_v__bia_b_n_l_nh.jpg',
                thumbnailImageSrc: 'https://baodanang.vn/dataimages/202010/original/images1586089_Tiger_Beer_thay___i_di_n_m_o_b_t_ph__h_n_nh_ng_v_n_gi__nguy_n_v__bia_b_n_l_nh.jpg',
                alt: 'Description for Image 4',
                title: 'Title 4'
            },
            {
                itemImageSrc: 'https://images.baoquangnam.vn/Storage/NewsPortal/2022/5/19/127315/Huda-Expansion-In-Ce.jpg',
                thumbnailImageSrc: 'https://images.baoquangnam.vn/Storage/NewsPortal/2022/5/19/127315/Huda-Expansion-In-Ce.jpg',
                alt: 'Description for Image 5',
                title: 'Title 5'
            },
            {
                itemImageSrc: 'https://i.ytimg.com/vi/MW8TYaqQBAI/maxresdefault.jpg',
                thumbnailImageSrc: 'https://i.ytimg.com/vi/MW8TYaqQBAI/maxresdefault.jpg',
                alt: 'Description for Image 6',
                title: 'Title 6'
            },
            {
                itemImageSrc: 'https://i.ytimg.com/vi/SBzTLGFMi8c/maxresdefault.jpg',
                thumbnailImageSrc: 'https://i.ytimg.com/vi/SBzTLGFMi8c/maxresdefault.jpg',
                alt: 'Description for Image 7',
                title: 'Title 7'
            },
            {
                itemImageSrc: 'https://i.ytimg.com/vi/jSmDFDnGMto/maxresdefault.jpg',
                thumbnailImageSrc: 'https://i.ytimg.com/vi/jSmDFDnGMto/maxresdefault.jpg',
                alt: 'Description for Image 8',
                title: 'Title 8'
            },
            {
                itemImageSrc: '../../assets/img/traCoziChai.jpg',
                thumbnailImageSrc: '../../assets/img/traCoziChai.jpg',
                alt: 'Description for Image 9',
                title: 'Title 9'
            },
            {
                itemImageSrc: 'https://cdn.tgdd.vn/Files/2022/08/31/1461052/dap-tan-con-khat-voi-sua-trai-cay-nutriboost-va-fanta-huong-nho-moi-202209260819220075.jpg',
                thumbnailImageSrc: 'https://cdn.tgdd.vn/Files/2022/08/31/1461052/dap-tan-con-khat-voi-sua-trai-cay-nutriboost-va-fanta-huong-nho-moi-202209260819220075.jpg',
                alt: 'Description for Image 10',
                title: 'Title 10'
            },
            {
                itemImageSrc: 'https://media-api.advertisingvietnam.com/oapi/v1/media/03a58fcc-ab55-4931-ba62-85ffb979b9a7/1200x630/conver.png',
                thumbnailImageSrc: 'https://media-api.advertisingvietnam.com/oapi/v1/media/03a58fcc-ab55-4931-ba62-85ffb979b9a7/1200x630/conver.png',
                alt: 'Description for Image 11',
                title: 'Title 11'
            },
            {
                itemImageSrc: 'https://static.tuoitre.vn/tto/i/s626/2016/11/14/sting2-1479135338.jpg',
                thumbnailImageSrc: 'https://static.tuoitre.vn/tto/i/s626/2016/11/14/sting2-1479135338.jpg',
                alt: 'Description for Image 12',
                title: 'Title 12'
            },
            {
                itemImageSrc: 'https://bizweb.dktcdn.net/100/060/439/files/poster-quang-cao-sua-vinamilk-1234456.jpg?v=1470526662182',
                thumbnailImageSrc: 'https://bizweb.dktcdn.net/100/060/439/files/poster-quang-cao-sua-vinamilk-1234456.jpg?v=1470526662182',
                alt: 'Description for Image 13',
                title: 'Title 13'
            },
            {
                itemImageSrc: 'https://i.ytimg.com/vi/qE0lwFZGzFI/maxresdefault.jpg',
                thumbnailImageSrc: 'https://i.ytimg.com/vi/qE0lwFZGzFI/maxresdefault.jpg',
                alt: 'Description for Image 14',
                title: 'Title 14'
            }
        ];
    }

    getImages() {
        return Promise.resolve(this.getData());
    }
};
