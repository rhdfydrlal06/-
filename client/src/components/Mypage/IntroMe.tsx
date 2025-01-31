/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getMyInfo } from "../../modules/myInfo";
import { getNewAccess } from "../../modules/newToken";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { editImg } from "../../modules/mypageEditImgSlice";
import Modal from '@mui/material/Modal';
// import { profile_img, option_box, file_select } from "../../css/register_css";

// import {avatar} from '../../assets/mainAvatar.png'

const Input = styled("input")({
    display: "none",
});

function IntroMe() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const refreshTkn = sessionStorage.getItem("usrRfshTkn");
    const user_id = String(sessionStorage.getItem("user_id"));
    const user_img = sessionStorage.getItem("img");
    const formData = new FormData();

    const [isInfo, setIsInfo] = useState(false);

    const newToken = useSelector(
        (state: RootStateOrAny) => state.getNewAccessList.list
    );

    useEffect(() => {
        // console.log("<IntroMe> : dispatch > getMyInfo");
        dispatch(getMyInfo());
    }, [dispatch]);

    const myInfo = useSelector(
        (state: RootStateOrAny) => state.getMyInfoList.list
    );

    // const user_info = useSelector((state: RootStateOrAny) => state.getUserInfo);

    useEffect(() => {
        // console.log("<IntroMe> : myInfo : ", myInfo);
        if (Array.isArray(myInfo) && myInfo.length === 0) {
            // console.log("<IntroMe> : myInfo empty");
        } else if (!myInfo) {
            // console.log("<IntroMe> : myInfo false");
            dispatch(
                getNewAccess({
                    refresh_token: refreshTkn,
                })
            );
        } else {
            // console.log("<IntroMe> : myInfo true ", myInfo.data.user_info);
            setIsInfo(true);
        }
    }, [dispatch, myInfo, refreshTkn]);

    useEffect(() => {
        // console.log("<newToken> : ", newToken);
        if (Array.isArray(newToken) && newToken.length === 0) {
            // console.log("<newToken> : token empty");
        } else if (!newToken) {
            // console.log("<newToken> : token false");
        } else {
            // console.log("<newToken> : token true ", newToken.data);
            sessionStorage.removeItem("usrAcsTkn");
            sessionStorage.setItem("usrAcsTkn", newToken.data["access_token"]);
            // console.log("<newToken> : dispatch > again");
            dispatch(getMyInfo());
        }
    }, [dispatch, newToken]);

    // 프로필 사진 수정 api
    // 프로필 수정 버튼 - 모달
    const modifyImg = () => {
        handleOpen1();
    };

    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const handleImage = async (e: any) => {
        let file = e.target.files[0];

        await formData.set("user_id", user_id);
        await formData.set("img", file);

        await dispatch(editImg(formData));
        handleClose1();
        navigate("/mypage");
    };

    return (
        <>
            {isInfo ? (
                <div style={{ width: "100%" }}>
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            // justifyContent: 'center',
                            flexDirection: "row",
                            marginLeft: "15%",
                        }}
                    >
                        <Avatar
                            alt={myInfo.data.user_info.nickname}
                            src={typeof user_img == "string" ? user_img : ""}
                            sx={{ width: 128, height: 128 }}
                        />
                        <Box
                            component="div"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                pl: 5,
                            }}
                        >
                            <Box
                                component="div"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-end",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    component="div"
                                    sx={{ fontFamily: "Elice" }}
                                >
                                    {myInfo.data.user_info.nickname}
                                </Typography>
                                {/* <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    component="div"
                                    sx={{ pl: 4, pb: 1 }}
                                >
                                    Lv. {myInfo.data.user_info.exp}
                                </Typography> */}
                            </Box>
                            <Box
                                component="div"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    component="div"
                                    sx={{ fontFamily: "Elice" }}
                                >
                                    댓글작성한 레시피{" "}
                                    {myInfo.data.my_post.length}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    component="div"
                                    sx={{ fontFamily: "Elice", pl: 2 }}
                                >
                                    스크랩 레시피{" "}
                                    {myInfo.data.liked_recipe.length}
                                </Typography>
                            </Box>
                            <Box component="div">
                                <OkButton
                                    variant="outlined"
                                    onClick={modifyImg}
                                    sx={{ fontFamily: "Elice" }}
                                >
                                    프로필 사진 수정
                                </OkButton>
                            </Box>
                            <Modal
                                open={open1}
                                onClose={handleClose1}
                                sx={{ textAlign: "center" }}
                            >
                                <Box sx={style}>
                                    <label htmlFor="icon-button-file">
                                        <Input
                                            type="file"
                                            id="icon-button-file"
                                            accept="image/*"
                                            onChange={handleImage}
                                        />
                                        <IconButton
                                            aria-label="upload picture"
                                            component="span"
                                        >
                                            <Avatar
                                                alt="profile image on the header bar"
                                                src={
                                                    typeof user_img == "string"
                                                        ? user_img
                                                        : ""
                                                }
                                                sx={{
                                                    width: 112,
                                                    height: 112,
                                                }}
                                                component="span"
                                            />
                                        </IconButton>
                                    </label>
                                    <Typography
                                        sx={{
                                            fontFamily: "Elice",
                                            textAlign: "center",
                                        }}
                                    >
                                        위 이미지를 클릭 후 프로필 이미지를
                                        업로드하세요.
                                    </Typography>
                                </Box>
                            </Modal>
                        </Box>
                    </Box>
                </div>
            ) : (
                "no"
            )}
        </>
    );
}

export default IntroMe;

const OkButton = styled(Button)({
    // backgroundColor: '#897A5F',
    marginTop:'0.5rem',
    borderColor: '#897A5F',
    color : '#897A5F',
    '&:hover': {
        borderColor: '#897A5F',
    },
});

// 중복확인 모달
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '27%',
    bgcolor: 'white',
    border: '10px solid white',
    color : '#897A5F',
    boxShadow: 24,
    p: 4,
};

// 중복확인 모달 내 확인 버튼
const CheckButton = styled(Button)({
    marginTop:'20px',
    backgroundColor: '#897A5F',
    borderColor: '#897A5F',
    color:'white',
    '&:hover': {
        backgroundColor: '#897A5F',
        borderColor: '#897A5F',
        color:'white',
    },
});