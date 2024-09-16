using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://0.0.0.0:8080"); // Add this line

// Add services to the container.
builder.Services.AddControllers();

// Add CORS service
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Allow your frontend's URL
              .AllowAnyMethod() // Allow any HTTP method (GET, POST, PUT, DELETE, etc.)
              .AllowAnyHeader(); // Allow any headers
    });
});

builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS
app.UseCors("AllowFrontend");

// app.UseHttpsRedirection(); // Comment this out if you're using HTTP only

app.UseAuthorization();

app.MapControllers();

app.Run();