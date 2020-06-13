import React from 'react'

import UserAvatar from 'react-user-avatar'

const EntryHeader = ({author}) => {
    return (
        <div className="text-left ">
            <div className="d-flex align-items-center">
                <UserAvatar src={author.picture} name="picture" size={48} />
                <div className="ml-3">
                    <h6 className="font-size-16">{author.name}</h6>
                    <h6 className="text-muted font-size-14">Front-End Developer</h6>
                </div>
            </div>
        </div>
    )
}
export default EntryHeader