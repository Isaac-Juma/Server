


const protectedGoals = () => {
    const privateGoals = [
        {name: 'Alice', age: 45, isActive: true, position: 1, level: 45, Done: true},
        {name: 'Isaac', age: 30, isActive: false, position: 2, level: 43, Done: true},
        {name: 'Juma', age: 25, isActive: false, position: 5, level: 40, Done: true},
        {name: 'Jane', age: 18, isActive: true, position: 4, level: 36, Done: true}
    ];

    return {
        add (item) {
            privateGoals.push(item)

        },

        delete (item) {
            privateGoals.splice(item)
        },

        getAll  () {
            return [...privateGoals]
        }
    };
};

const myArray = protectedGoals();
myArray.add('Love');
myArray.getAll();
console.log(myArray.getAll())
const name = false;

function test () {
    let name = [2, 4, 5, 6, 43, 32, 5];

}

