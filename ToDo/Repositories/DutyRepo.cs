using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Entities;

namespace ToDo.Repositories
{
    public class DutyRepo
    {
        public List<Duty> GetAll()
        {
            List<Duty> TaskList = new List<Duty>();
            string cadena = "";
            using (var conexion = new SqliteConnection(cadena))
            {
                conexion.Open();
                var command = conexion.CreateCommand();

                command.CommandText = "SELECT id, description, isActive FROM Duties; ";
                SqliteDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var actualDuty = new Duty();
                    actualDuty.Id = Convert.ToInt32(reader["id"]);
                    actualDuty.Description = reader["description"].ToString();                   
                    actualDuty.IsActive = Convert.ToBoolean(reader["isActive"]);
                    TaskList.Add(actualDuty);
                }
                reader.Close();
                conexion.Close();
            }
            return TaskList;
        }
    }
}
