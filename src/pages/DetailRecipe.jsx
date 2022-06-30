import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import styles from "../assets/styles/detailrecipe.module.css";
import videoImg from "../assets/images/video.svg";

import { getDetailRecipe } from "../redux/actions/getDetailRecipe";

const DetailRecipe = () => {
	const dispatch = useDispatch();
	const detailRecipe = useSelector((state) => {
		return state.detailRecipe;
	});
	const { id } = useParams();
	useEffect(() => {
		dispatch(getDetailRecipe(id));
	}, []);
	return (
		<>
			<Navbar />
			<div className={styles.container}>
				<section className={styles.containerIntro}>
					<div className={styles.containerIntroContent}>
						<div className={styles.containerIntroContentJumbotron}>
							<div className={styles.containerIntroContentJumbotronTopContent}>
								<h1>{detailRecipe.data.title}</h1>
								<img
									src={`${process.env.REACT_APP_MY_BACKEND}/${detailRecipe.data.photo}`}
									alt=""
									onError={(e) => {
										e.target.src = `${process.env.REACT_APP_MY_BACKEND}/recipe-default.jpeg`;
									}}
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className={styles.container2}>
				<section className={styles.container2Intro}>
					<div className={styles.container2IntroJumbotron}>
						<div className={styles.container2IntroJumbotronMidContent}>
							<h1>Ingredients</h1>
							<ul>
								<li>{detailRecipe.data.ingredients}</li>
							</ul>
							<div
								className={styles.container2IntroJumbotronMidContentVideoList}
							>
								<Link
									className={
										styles.container2IntroJumbotronMidContentVideoListLink
									}
									to="#"
								>
									<button>
										<img src={videoImg} alt="logo Video" />
									</button>
								</Link>
								<Link
									className={
										styles.container2IntroJumbotronMidContentVideoListLink
									}
									to="#"
								>
									<button>
										<img src={videoImg} alt="logo Video" />
									</button>
								</Link>
								<Link
									className={
										styles.container2IntroJumbotronMidContentVideoListLink
									}
									to="#"
								>
									<button>
										<img src={videoImg} alt="LogoVideo" />
									</button>
								</Link>
								<Link
									className={
										styles.container2IntroJumbotronMidContentVideoListLink
									}
									to="#"
								>
									<button>
										<img src={videoImg} alt="Logo Video" />
									</button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className={styles.container3}>
				<section className={styles.container3Intro}>
					<div className={styles.container3IntroJumbotron}>
						<div className={styles.container3IntroJumbotronBottomContent}>
							<div
								className={
									styles.container3IntroJumbotronBottomContentCommentOnly
								}
							>
								<div
									className={
										styles.container3IntroJumbotronBottomContentCommentOnlyComment
									}
								>
									<div
										className={
											styles.container3IntroJumbotronBottomContentCommentOnlyCommentCommentText
										}
									>
										Comment
									</div>
									<input type="text" placeholder="" />
								</div>
							</div>
							<div
								className={
									styles.container3IntroJumbotronBottomContentButtonContainer
								}
							>
								<Link to="#">
									<button>Send</button>
								</Link>
							</div>
							<div
								className={
									styles.container3IntroJumbotronBottomContentCommentList
								}
							>
								<h1>Comment</h1>
								<div
									className={
										styles.container3IntroJumbotronBottomContentCommentListCommentProfile
									}
								>
									<img
										src="https://s3-alpha-sig.figma.com/img/3d1d/4c1c/c08f710828e1d2aacf71af8c92583062?Expires=1652054400&Signature=S~PjM74VOAIC8l7MzzQKvy12l0wT6~zaN0BxYZjEFn6hDvWrdPtr0RoBYVUy1KblIBTZLXmQAlq7DW2RZQnjFIPlFOsjhC49zNZ4jiCv2KGZeWjOh67IGKhah6avI1dhlHKT6Lxa7dac1FM1a0mCxO5WNo44wCMzuw9SdWCotLwALt645UEB6rLpAK-1uQfqWQV5gIdbl~MDiDhgVS2Oh-26PVq4-8tPKUzCzJlkT74ijzN0DATSw1BNfswaDyfLyh~adkD2oqWc7WzQF5jraDXY~KbR17nY1McHXL~isyHRMcq8Sq3knHseT6zGw9t3hohr2xET4DR1icaf4bpZxQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
										alt=""
									/>
									<div
										className={
											styles.container3IntroJumbotronBottomContentCommentListCommentProfileWhatComment
										}
									>
										<div
											className={
												styles.container3IntroJumbotronBottomContentCommentListCommentProfileWhatCommentName
											}
										>
											Ayudia
										</div>
										<div
											className={
												styles.container3IntroJumbotronBottomContentCommentListCommentProfileWhatCommentItsComment
											}
										>
											Nice recipe. simple and delicious, thankyou
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<Footer />
			</div>
		</>
	);
};
export default DetailRecipe;
