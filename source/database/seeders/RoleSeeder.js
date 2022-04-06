const date = new Date();
const created_at = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

const data = [
    {
        id: 1,
        name: 'fan',
        createdAt: created_at,
        updatedAt: created_at
    },
    {
        id: 2,
        name: 'team',
        createdAt: created_at,
        updatedAt: created_at
    }
]
const runRoleSeeder = async (db) => {
    try{
        for(let i=0; i<data.length; i++){
            let res = await db.query('Select * FROM roles WHERE id = $1', [data[i].id]);
            res = res.rows[0] || null
            if(res){
                await db.query('UPDATE roles SET name=$1, updated_at=$2 WHERE id=$3', [data[i].name, data[i].updatedAt, res.id])
            }else{
                await db.query('INSERT INTO roles (name, created_at, updated_at) VALUES($1, $2, $3)', [data[i].name, data[i].createdAt, data[i].updatedAt])
            }
        }
        return 'Role seeder run successfully'
    }catch (err) {
        return 'Error occur while running role seeder: '+err.message;
    }
}

module.exports = runRoleSeeder