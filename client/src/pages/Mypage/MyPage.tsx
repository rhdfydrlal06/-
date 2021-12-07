/** @jsxImportSource @emotion/react */
import IntroMe from "../../components/Mypage/IntroMe";
import MyPost from "../../components/Mypage/myPost";
import MyScrap from '../../components/Mypage/myScrap'

function MyPage() {
    return (
        <div>
            <IntroMe />
            <MyPost />
            <MyScrap />
        </div>
    );
}

export default MyPage;
