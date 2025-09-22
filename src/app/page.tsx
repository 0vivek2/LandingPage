"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function LandingPage() {
  const heroImages = ["/travel4.jpg", "/travel2.jpg", "/travel3.jpg"];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notifications, setNotifications] = useState(3);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const [typingText, setTypingText] = useState("");
  const [tagsArray, setTagsArray] = useState<string[][]>([]);

  const fullText =
    "Explore breathtaking destinations, unique experiences, and unforgettable journeys.";

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Typing effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypingText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(typingInterval);
    }, 30);
    return () => clearInterval(typingInterval);
  }, [fullText]);

  // Generate random tags client-side
  useEffect(() => {
    const tags = ["Adventure", "Culture", "Nature", "Beach", "City"];
    const newTags = heroImages.map(() =>
      tags.sort(() => 0.5 - Math.random()).slice(0, 3)
    );
    setTagsArray(newTags);
  }, [heroImages.length]);

  const scrollToDestinations = () =>
    destinationsRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToTop = () =>
    typeof window !== "undefined" &&
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Featured Experiences
  const experiences = [
    { title: "Trekking Adventure", img: "/trekking.jpg" },
    { title: "City Tours", img: "/city.jpg" },
    { title: "Diving Experience", img: "/diving.jpg" },
  ];

  return (
    <main style={{ fontFamily: "'Segoe UI', sans-serif", color: "#222" }}>
      {/* Navigation */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.8)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "#0077ff",
            cursor: "pointer",
          }}
          onClick={() => alert("Welcome to Travio!")}
        >
          🌍 Travio
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() =>
              alert(`You have ${notifications} notifications!`)
            }
          >
            🔔
            {notifications > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "#ff3b3b",
                  color: "#fff",
                  fontSize: "0.7rem",
                  padding: "2px 6px",
                  borderRadius: "50%",
                  animation: "pulse 1.5s infinite",
                }}
              >
                {notifications}
              </span>
            )}
          </div>
          <button
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
          <button
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              background: "#0077ff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "90vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transition: "opacity 1s ease",
              opacity: idx === currentSlide ? 1 : 0,
            }}
          >
            <Image
              src={img}
              alt={`Hero ${idx}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.2))",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "700px" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Discover Your Next Adventure
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
            {typingText}
          </p>
          <button
            onClick={scrollToDestinations}
            style={{
              padding: "14px 28px",
              fontSize: "1rem",
              background: "#ff7b29",
              color: "#fff",
              borderRadius: "30px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Explore Now
          </button>
          <div style={{ marginTop: "20px" }}>
            {heroImages.map((_, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  margin: "0 5px",
                  background:
                    i === currentSlide ? "#fff" : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section
        id="destinations"
        ref={destinationsRef}
        style={{ padding: "80px 40px", background: "#f5f5f5" }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "50px",
            textAlign: "center",
          }}
        >
          Popular Destinations
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
            >
              <div style={{ position: "relative", height: "200px" }}>
                <Image
                  src={img}
                  alt={`Destination ${idx}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "60%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "16px",
                    color: "#fff",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "1.3rem" }}>
                    Beautiful Place {idx + 1}
                  </h3>
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                {/* Tags */}
                <div
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  {tagsArray[idx]?.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#ff7b29",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    color: "#555",
                    fontSize: "0.95rem",
                    marginBottom: "10px",
                  }}
                >
                  Explore Beautiful Place {idx + 1}, where culture meets nature and unforgettable memories await.
                </p>
                <button
                  style={{
                    padding: "8px 16px",
                    fontSize: "0.9rem",
                    borderRadius: "6px",
                    background: "#0077ff",
                    color: "#fff",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() =>
                    alert(`View Details: Beautiful Place ${idx + 1}`)
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Experiences */}
      <section style={{ padding: "80px 40px", background: "#fff" }}>
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: 700,
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Featured Experiences
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              style={{
                width: "250px",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            >
              <div style={{ position: "relative", height: "150px" }}>
                <Image
                  src={exp.img}
                  alt={exp.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "12px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  {exp.title}
                </h3>
                <button
                  style={{
                    marginTop: "8px",
                    padding: "6px 12px",
                    background: "#ff7b29",
                    color: "#fff",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() => alert(`Clicked on ${exp.title}`)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Subscribe */}
      <section
        style={{
          padding: "60px 40px",
          background: "#f5f5f5",
          textAlign: "center",
          borderRadius: "16px",
          margin: "40px",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
          Subscribe for Travel Deals
        </h2>
        <p style={{ marginBottom: "20px" }}>
          Get the latest updates and special offers directly in your inbox.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            background: "#0077ff",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Subscribe
        </button>
      </section>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          background: "#0077ff",
          color: "#fff",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "24px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        ↑
      </button>
    </main>
  );
}
