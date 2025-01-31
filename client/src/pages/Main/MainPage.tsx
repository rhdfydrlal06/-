/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom"
// import { setImageFile, setPreviewUrl } from "../../modules/searchedImageSlice";
import { getRanking, clearRanking } from "../../modules/rankingSlice";
import background from "../../assets/main.jpg";
import DropZone from "../../components/Main/DropZone";

import MainSlide from "../../components/Main/mainSlide";
import { top3Name } from "../../css/main_css";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import character from '../../assets/character.png'
import avatar1 from '../../assets/avater_1.png'
import avatar from '../../assets/avatar.png'
import kkokko1 from '../../assets/kkokko_1.png'
import kkokko2 from '../../assets/kkokko_2.png'
import kkokko3 from '../../assets/kkokko_3.png'

const imgList = [kkokko1,kkokko2,kkokko3];

const SearchDiv = styled("div")(({ theme }) => ({
    height: "80%",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column"
    },
}));

const DropDiv = styled("div")(({ theme }) => ({
    width: "60%",
    height: "40vh",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
        width: "80%"
    },
}));

const GuideTitleText = styled("p")(({ theme }) => ({
    fontFamily: "EliceBold",
    fontSize: "2rem",
    marginTop:'3rem',
    [theme.breakpoints.down("md")]: {
        fontSize: "1rem",
        margin:'0',
    },
}));

const GuideText = styled("p")(({ theme }) => ({
    fontFamily: "Elice",
    fontSize: "1.5rem",
    [theme.breakpoints.down("md")]: {
        fontSize: "1rem",
    },
}));

const Top3Image = styled("img")(({ theme }) => ({
    width: "90%",
    height: "30vh",
    cursor: "pointer",
    boxShadow: "2px 2px 6px gray",
    marginBottom: "5%",
    "&:hover": {
        opacity: 0.8,
        transition: "all 0.3s ease-in-out",
    },
    [theme.breakpoints.down("md")]: {
        height: "15vh",
    },
}));

const TopRestImage = styled("img")(({ theme }) => ({
    width: "90%",
    height: "20vh",
    cursor: "pointer",
    boxShadow: "2px 2px 6px gray",
    marginBottom: "5%",
    "&:hover": {
        opacity: 0.8,
        transition: "all 0.3s ease-in-out",
    },
    [theme.breakpoints.down("md")]: {
        height: "10vh",
    },
}));

const MainSearch = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#fbfbf9",
                width: "80vw",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                margin: "10% auto",
                padding: "0 5%",
            }}
        >
            <Box sx={{ width: "100%", height: "20vh", margin: "auto 0" }}>
                <Typography
                    sx={{
                        fontFamily: "EliceBold",
                        fontSize: "4rem",
                        textAlign: "center",
                        marginTop: "5%",
                        color: "#897A5F",
                    }}
                >
                    이미지 검색
                </Typography>
            </Box>
            <SearchDiv>
                <DropDiv>
                    <DropZone />
                </DropDiv>
                <Box sx={{ width: "60%", height: "40vh", margin: "auto auto", textAlign:'center' }}>
                    <GuideTitleText>
                        이렇게 찍어주세요!
                    </GuideTitleText>
                    <GuideText>
                        1. 완성된 음식 사진을 올려주세요.
                    </GuideText>
                    <GuideText>
                        2. 화질이 나쁜 사진은 검색이 어렵습니다.
                    </GuideText>
                    <GuideText>
                        3. 음식이 잘 보이는 사진으로 검색해주세요.
                    </GuideText>
                </Box>
            </SearchDiv>
        </Box>
    );
}

const MainRanking = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getRanking());
        return () => {
            dispatch(clearRanking());
        };
    }, [dispatch]);

    // const handleClick = (item: any) => {
    //     navigate(`/recipe/${item.id}`);
    //     return;
    // }

    const ranking = useSelector((state: RootStateOrAny) => state.rankingSlice.ranking);

    // 순위 3위 전후로 나누기
    const [top3List, setTop3List] = useState<any[]>([]);
    const [othersList, setOthersList] = useState<any[]>([]);
    useEffect(() => {
        if(ranking.length !== 0){
            setTop3List([ranking[0], ranking[1], ranking[2]]);
            setOthersList([ranking[3], ranking[4], ranking[5],ranking[6], ranking[7], ranking[8],ranking[9], ranking[10]]);
        }
    },[ranking])
    // console.log(top3List)
    // console.log(othersList)

    return (
        <Box
            sx={{
                backgroundColor: "#fbfbf9",
                width: "80vw",
                display: "flex",
                flexDirection: "column",
                margin: "10% auto",
                padding: "0 5%",
            }}
        >
            <Box sx={{ width: "100%", height: "20vh", margin: "auto 0" }}>
                <Typography
                    sx={{
                        fontFamily: "EliceBold",
                        fontSize: "4rem",
                        textAlign: "center",
                        marginTop: "5%",
                        color: "#897A5F",
                    }}
                >
                    레시피 랭킹
                </Typography>
            </Box>
            <Box sx={{ width: "100%", margin: "auto 0", textAlign:'center' }}>
                <Box sx={{ display: "flex" }}>
                    {top3List
                        ? top3List.map((item: any, index: number) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: "80%",
                                        display: "flex",
                                        flexDirection: "column",
                                        marginBottom: "5%",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="h2"
                                            gutterBottom
                                            component="p"
                                            sx={{ fontFamily: "EliceBold", color:'#191919', textShadow:'2px 2px 4px gray' }}
                                        >
                                            <img src={imgList[top3List.indexOf(item)]} alt="kkokko"/> {top3List.indexOf(item) + 1}위 
                                        </Typography>
                                        <Top3Image
                                            src={item.img}
                                            alt={item.name}
                                            onClick={() =>
                                                navigate(`/recipe/${item.id}`)
                                            }
                                        ></Top3Image>
                                        <div css={top3Name}>
                                            <Typography
                                                variant="h5"
                                                gutterBottom
                                                component="p"
                                                sx={{
                                                    fontFamily: "Elice",
                                                    width: "20vw",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                        </div>
                                    </Box>
                                </Box>
                            ))
                        : ""}
                </Box>
                <ImageList
                    cols={3}
                    gap={20}
                    sx={{
                        width: "100%",
                        height: "150%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        marginBottom: "10%",
                    }}
                >
                    {othersList
                        ? othersList.map((item: any) => (
                                <ImageListItem
                                    key={item.img}
                                    sx={{ width: "20%", height: "10rem"}}
                                >
                                    <TopRestImage
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        alt={item.title}
                                        onClick={() =>
                                            navigate(`/recipe/${item.id}`)
                                        }
                                    />
                                    <ImageListItemBar
                                        title={item.name}
                                        position="below"
                                        sx={{
                                            fontFamily: "Elice",
                                            fontWeight: "600",
                                        }}
                                    />
                                </ImageListItem>
                            ))
                        : ""}
                </ImageList>
            </Box>
        </Box>
    );
}

function MainPage() {
    return (
        <div style={{ marginTop:'1rem' }}>
            <MainSlide/>
            <MainSearch />
            <MainRanking />
        </div>
    );
}

export default MainPage;






// <div id="sec2" className="page-section">
//                 {/* <ImageListItem key="Subheader" cols={3}> */}
//                 <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//                     {ranking.map((item: any) => {
//                         return (
//                             <Grid item xs={2} sm={3} md={3} display="flex" justifyContent="center">
//                                 <Card sx={{ width: 250 }}>
//                                     <CardActionArea onClick={() => navigate(`/recipe/${item.id}`)}>
//                                         <CardMedia
//                                             component="img"
//                                             height="150"
//                                             image={item.img}
//                                             alt="Paella dish"
//                                         />
//                                         <CardContent sx={{height: 150}}>
//                                             <Typography gutterBottom variant="h6" component="div">
//                                                 {item.name}
//                                             </Typography>
//                                             <Typography variant="body2" color="text.secondary" sx={{position: "absolute", bottom: 10}}>
//                                                 {`조회수: ${item.views}`}
//                                                 {`좋아요: ${item.likes}`}
//                                             </Typography>
//                                         </CardContent>
//                                     </CardActionArea>
//                                 </Card>
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//             </div>

// , boxShadow:'10px 5px 20px gray'