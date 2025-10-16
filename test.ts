type FormFields = {
  firstName: string;
  age: number;
};


function updateField<U extends keyof FormFields>(
  field: U,
  value: FormFields[U]
) {
  console.log(`Updating ${field} with ${value}`);
}

// Correct usage
updateField("firstName", "Alice"); // ✅ type-safe
updateField("age", 25);            // ✅ type-safe

// Incorrect usage
//updateField("randomKey", "??");    // ❌ Error: "randomKey" not assignable to "firstName" | "age"
//updateField("age", "twenty");      // ❌ Error: string not assignable to number
const test = {
    level:1,
    nestedOne:{
        level:2,
        nestedTwo:{
            level:3
        }
    }
}

const test = [{
    array:[{title:"title1",count:1},{title:"title2",count:2},{title:"title3",count:3},{title:"title4",count:4}]
},{
    array:[{title:"manelt",count:1},{title:"manelt2",count:2},{title:"manelt3",count:3},{title:"manelt4",count:4}]
}]

db.contacts.createIndex(
  { 'dob.age': 1 },
  { partialFilterExpression: { 'dob.age': 1, gender: 'Male' } }
);

db.users.createIndex(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } }
);

db.geometry.find({
    location:{
        $near:{
            $geometry:{
                type:"Point",
                coordinates:[11.118740430327053,79.66169538497662]
            },
            $maxDistance: 1000
        }
    }
})


11.118740430327053, 79.66169538497662
11.1018259751523, 79.64733664298662


db.friends.aggregate([{$group:{_id:{age:"$age"},allHobbies:{$push:"$hobbies"}}}])
