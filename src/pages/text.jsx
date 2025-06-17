import { Helmet } from 'react-helmet';

const MyPage = () => {
    return (
        <>
            <Helmet>
                <title>My Page Title</title>
                <meta property="og:title" content="My Page Title" />
                <meta property="og:description" content="Page description here" />
                <meta property="og:image" content="https://tcijrogmncatfkddtyzm.supabase.co/storage/v1/object/public/book/0.9235983413282883.jpg" />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="My Page Title" />
                <meta name="twitter:description" content="Page description here" />
                <meta name="twitter:image" content="https://tcijrogmncatfkddtyzm.supabase.co/storage/v1/object/public/book/0.9235983413282883.jpg" />
            </Helmet>

            <div>
                We are testing here
            </div>
        </>
    );
};

export default MyPage;
