import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { fetchLikesForUser } from "../../../../app/reducers/likesSlice";
import { UserBio } from "./UserBio";
import { UserAvatar } from "./UserAvatar";
import './UserProfile.css'
import { UserLikedPictures } from "./UserLikedPictures";
import { UserInfo } from "./UserInfo";

export const UserProfile = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.user);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchLikesForUser(currentUser.id));
    }
  }, [currentUser, dispatch])

  return (
    <div className="profile">
      <div className="profile-header">
        <UserAvatar />
        <UserInfo user={currentUser} />
      </div>
      <UserBio />
      <UserLikedPictures user={currentUser} />
    </div>
  )
}