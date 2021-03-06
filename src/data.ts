const data = {
    menuItems: [
        {
            price: 30,
            name: 'Peon',
            icon: 'images/ship1.png',
            tooltip: {
                title: 'Peon lord',
                price: 30,
                description: 'PV: 100 D: 15 S: 1.5 R: 100',
            },
        },
        {
            price: 100,
            name: 'Grunt',
            icon: 'images/ship2.png',
            tooltip: {
                title: 'Grunt',
                price: 100,
                description: 'PV: 400 D: 50 S: 1.5 R: 200',
            },
        },
        {
            price: 120,
            name: 'Ranger',
            icon: 'images/ship3.png',
            tooltip: {
                title: 'Ranger',
                price: 120,
                description: 'PV: 200 D: 50 S: 3 R: 400',
            },
        },
        {
            price: 200,
            name: 'Stalker',
            icon: 'images/ship4.png',
            tooltip: {
                title: 'Stalker',
                price: 200,
                description: 'PV: 600 D: 100 S: 1.5 R: 250',
            },
        },
        {
            price: 340,
            name: 'Zeplin',
            icon: 'images/ship5.png',
            tooltip: {
                title: 'Zeplin',
                price: 340,
                description: 'PV: 1000 D: 200 S: 1 R: 100',
            },
        },
        {
            price: 420,
            name: 'Queen',
            icon: 'images/ship6.png',
            tooltip: {
                title: 'Queen',
                price: 420,
                description: 'PV: 800 D: 80 S: 2 R: 300',
            },
        },
        {
            price: 510,
            name: 'Banshee',
            icon: 'images/ship7.png',
            tooltip: {
                title: 'Banshee',
                price: 510,
                description: 'PV: 400 D: 100 S: 3 R: 200',
            },
        },
        {
            price: 600,
            name: 'Wyrms',
            icon: 'images/ship8.png',
            tooltip: {
                title: 'Wryms',
                price: 600,
                description: 'PV: 2000 D: 200 S: 1.1 R: 200',
            },
        },
        {
            price: 710,
            name: 'Abomination',
            icon: 'images/ship9.png',
            tooltip: {
                title: 'Abomination',
                price: 710,
                description: 'PV: 1200 D: 150 S: 3.5 R: 200',
            },
        },
        {
            price: 990,
            name: 'truc',
            icon: 'images/ship10.png',
            tooltip: {
                title: 'truc',
                price: 990,
                description: 'PV: 4000 D: 100 S: 5 R: 400',
            },
        },
    ],
    towers: [
        {
            name: 'Peon',
            pv: 100,
            damage: 15,
            attackSpeed: 1.5,
            range: 100,
            icon: 'images/ship1.png',
        },
        {
            name: 'Grunt',
            pv: 400,
            damage: 50,
            attackSpeed: 1.5,
            range: 200,
            icon: 'images/ship2.png',
        },
        {
            name: 'Ranger',
            pv: 200,
            damage: 50,
            attackSpeed: 3,
            range: 400,
            icon: 'images/ship3.png',
        },
        {
            name: 'Stalker',
            pv: 600,
            damage: 100,
            attackSpeed: 1.5,
            range: 250,
            icon: 'images/ship4.png',
        },
        {
            name: 'Zeplin',
            pv: 1000,
            damage: 200,
            attackSpeed: 1,
            range: 100,
            icon: 'images/ship5.png',
        },
        {
            name: 'Queen',
            pv: 800,
            damage: 80,
            attackSpeed: 2,
            range: 300,
            icon: 'images/ship6.png',
        },
        {
            name: 'Banshee',
            pv: 400,
            damage: 100,
            attackSpeed: 3,
            range: 200,
            icon: 'images/ship7.png',
        },
        {
            name: 'Wyrms',
            pv: 2000,
            damage: 200,
            attackSpeed: 1.1,
            range: 200,
            icon: 'images/ship8.png',
        },
        {
            name: 'Abomination',
            pv: 1200,
            damage: 150,
            attackSpeed: 3.5,
            range: 200,
            icon: 'images/ship9.png',
        },
        {
            name: 'truc',
            pv: 4000,
            damage: 100,
            attackSpeed: 5,
            range: 400,
            icon: 'images/ship10.png',
        },
    ],
    enemies: [
        {
            pv: 20,
            attackSpeed: 2,
            range: 50,
            name: 'nooby',
            damage: 1,
            wave: 1,
            gold: 3,
        },
        {
            pv: 40,
            attackSpeed: 3,
            range: 50,
            name: 'nooby2',
            damage: 1,
            wave: 2,
            gold: 4,
        },
        {
            pv: 100,
            attackSpeed: 1.5,
            range: 50,
            name: 'nooby',
            damage: 5,
            wave: 3,
            gold: 5,
        },
        {
            pv: 140,
            attackSpeed: 2,
            range: 50,
            name: 'nooby',
            damage: 9,
            wave: 4,
            gold: 7,
        },
        {
            pv: 150,
            attackSpeed: 2,
            range: 50,
            name: 'nooby',
            damage: 15,
            wave: 5,
            gold: 9,
        },
        {
            pv: 250,
            attackSpeed: 2,
            range: 50,
            name: 'nooby',
            damage: 20,
            wave: 6,
            gold: 11,
        },
        {
            pv: 350,
            attackSpeed: 2,
            range: 50,
            name: 'nooby',
            damage: 25,
            wave: 7,
            gold: 15,
        },
        {
            pv: 600,
            attackSpeed: 2,
            range: 50,
            name: 'nooby',
            damage: 50,
            wave: 8,
            gold: 17,
        },
        {
            pv: 800,
            attackSpeed: 2,
            range: 50,
            name: 'nooby',
            damage: 100,
            wave: 9,
            gold: 19,
        },
        {
            pv: 1500,
            attackSpeed: 2,
            range: 50,
            name: 'nooby',
            damage: 150,
            wave: 10,
            gold: 22,
        },
    ],
};

export { data };
