import { User } from "../models/user.model.js";
import { Conversation } from "../models/conservationModel.js";


export const getUserBySerch = async (req, res, next) => {
    try {
        const search = req.query.search || "";  
       console.log(search, "hai");
        const user = await User.find({
            $and :[
                {
                    $or : [
                        {username :{ $regex: '.*'+search+'.*', $options: "i"}},
                        {fullname :{ $regex: '.*'+search+'.*', $options: "i"}},
                    ]
                },{
                    _id : {$ne : req.user._id}
                }
            ]
        }).select("-password").select("email")
        res.status(200).json({ data: user });
        console.log(user, "hai");
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error" });
        next(error);
    }
}

export const getCurrentChats = async (req, res, next) => {
    try {
        const currentUserID = req.user._id;
        const currenTChatters = await Conversation.find({
            participants:currentUserID
        }).sort({
            updatedAt: -1
            });

            if(!currenTChatters || currenTChatters.length === 0)  return res.status(200).send([]);

            const partcipantsIDS = currenTChatters.reduce((ids,conversation)=>{
                const otherParticipents = conversation.participants.filter(id => id !== currentUserID);
                return [...ids , ...otherParticipents]
            },[])

            const otherParticipentsIDS = partcipantsIDS.filter(id => id.toString() !== currentUserID.toString());

            const user = await User.find({_id:{$in:otherParticipentsIDS}}).select("-password").select("-email");

            const users = otherParticipentsIDS.map(id => user.find(user => user._id.toString() === id.toString()));

            res.status(200).send(users)

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error" });
        next(error);
    }
} 