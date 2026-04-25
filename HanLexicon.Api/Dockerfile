# Stage 1: Base Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Stage 2: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["HanLexicon.Api/HanLexicon.Api.csproj", "HanLexicon.Api/"]
COPY ["HanLexicon.Application/HanLexicon.Application.csproj", "HanLexicon.Application/"]
COPY ["HanLexicon.Domain/HanLexicon.Domain.csproj", "HanLexicon.Domain/"]
COPY ["Infrastructure.BackgroundJobs/Infrastructure.BackgroundJobs.csproj", "Infrastructure.BackgroundJobs/"]
COPY ["Infrastructure.Postgres/Infrastructure.Postgres.csproj", "Infrastructure.Postgres/"]
COPY ["Infrastructure.Minio/Infrastructure.Minio.csproj", "Infrastructure.Minio/"]

RUN dotnet restore "HanLexicon.Api/HanLexicon.Api.csproj"

# Copy the rest of the code
COPY . .
WORKDIR "/src/HanLexicon.Api"
RUN dotnet build "HanLexicon.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Stage 3: Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "HanLexicon.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Stage 4: Final Image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HanLexicon.Api.dll"]
