class DailySystem {

    // static () {};

    constructor (Goal, Reminder, Deadline) {
        this.Goal = Goal,
        this.Reminder = Reminder,
        this.Deadline = Deadline
    };

    createGoals () {
        return (`Goal: ${this.Goal}`)

    };

    createReminder () {
        return `Time: ${this.Reminder}`

    };

    Deadline () {
        return (`DeadLine: ${this.Deadline}`)
    };

};

const myClass = new DailySystem('Improve-Awareness', 'By March 31st');
myClass.createGoals();


console.log(myClass.createGoals());
