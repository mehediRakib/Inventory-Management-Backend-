const mongoose = require("mongoose");

const createParentChildService = async (req, DataModel1, DataModel2, JointPropertyName) => {

    //Create Transaction session
    const session = await mongoose.startSession();
    try {
        //Start Transaction
        await session.startTransaction();
        let email = req.headers['email'];
        let parents = req.body['Parents'];
        parents.userEmail = email;
        //First Database process
        const ParentCreation = await DataModel1.create([parents], {session});


        let childs = req.body['Child'];
        await childs.forEach((element) => {
            element[JointPropertyName] = ParentCreation[0]['_id'];
            element['userEmail'] = email;
        })

        let ChildCreation = await DataModel2.insertMany(childs, {session});

        //Transaction success
        await session.commitTransaction();

        session.endSession();
        return {status: "success", ParentCreation: ParentCreation, ChildCreation: ChildCreation}

    } catch (e) {
        //Roll back Transaction If Fail
        await session.abortTransaction();
        session.endSession();
        return {status: "fail", data: e}

    }
}

module.exports = createParentChildService