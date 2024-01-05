using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using back_end.Models;

namespace back_end.Services
{
    public interface IEmailService
    {
        void SendEmail(Message message);
    }
}
