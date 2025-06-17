import { Helmet } from 'react-helmet';

const MyPage = () => {
    return (
        <>
            <Helmet>
                <title>My Page Title</title>
                <meta property="og:title" content="My Page Title" />
                <link rel="apple-touch-icon" href="https://tcijrogmncatfkddtyzm.supabase.co/storage/v1/object/public/book/0.9235983413282883.jpg" />
                <link rel="icon" href="https://tcijrogmncatfkddtyzm.supabase.co/storage/v1/object/public/book/0.9235983413282883.jpg" />

                <meta name="twitter:image" content="https://tcijrogmncatfkddtyzm.supabase.co/storage/v1/object/public/book/0.9235983413282883.jpg" />
            </Helmet>

            <div>
                We are testing here
            </div>
        </>
    );
};

export default MyPage;
