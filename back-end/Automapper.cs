using AutoMapper;
using Azure.AI.OpenAI;
using back_end.Classes;

namespace ProfessorAIAPI
{
    public class Automapper : Profile

    {
        public Automapper() : base()
        {
            CreateMap<User, UserDetail>();
            CreateMap<RegisterInfo, User>();
            CreateMap<PostRequest, Post>();
            CreateMap<PostReact, UserReact>();
        }
    }
}
