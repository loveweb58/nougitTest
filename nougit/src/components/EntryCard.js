import React from 'react'
import {Card, CardBody, CardHeader, CardFooter} from 'reactstrap'
import { FaRegComment } from "react-icons/fa";
import EntryHeader from './EntryHeader'
import PledgeCard from './PledgeCard'

const EntryCard = ({data}) => {
    return (
        <Card className="mb-4 text-left">
            <CardHeader>
                <EntryHeader author={data.author} />
            </CardHeader>
            <CardBody >
                <h6 className="font-size-16">{data.title}</h6>
                <h6 className="font-size-14 text-muted mt-1 mb-2">{data.description}</h6>
                <PledgeCard 
                    thumbnail={data.thumbnail} 
                    goal={data.pledgeGoal} 
                    total={data.pledgeTotal} 
                    count={data.pledgerCount}
                    codetotal={data.codeSubmissionTotal}
                />
            </CardBody>
            <CardFooter>
                <div className="d-flex align-items-center">
                    <FaRegComment color="" /> 
                        <h6 className="font-size-14 text-muted ml-2"> comments({data.numComments})</h6>
                    </div>
            </CardFooter>
        </Card>
    )
}

export default EntryCard