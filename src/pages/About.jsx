import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-8">
        <p className="text-3xl font-semibold">
          About <span className="text-blue-600">Us</span>
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <img 
            src={assets.about_image} 
            alt="About Us" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Text */}
        <div className="w-full md:w-1/2 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae libero dolores molestiae natus mollitia nulla tempore velit, possimus, nihil ipsum assumenda, non repellat cumque inventore.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui accusantium dignissimos voluptatem voluptatibus facilis omnis accusamus. Reiciendis minus, quia cum odit at dignissimos saepe illo, ipsa aperiam sed tempore voluptatibus ipsam qui temporibus amet doloremque repellendus dolore facilis eveniet eligendi nesciunt delectus pariatur animi assumenda. Quae adipisci voluptate alias.
          </p>

          {/* Vision Section */}
          <b className="text-xl text-gray-900">Our Vision</b>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, aspernatur corporis. Ipsa nisi repellat amet! Repellendus accusantium quo vel corrupti fugit repudiandae exercitationem voluptas explicabo aliquid, ratione cumque. Reiciendis, magnam.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">
  {/* Section Title */}
  <div className="text-xl font-semibold text-gray-800 my-4 text-center">
    <p>WHY US</p>
  </div>

  {/* Three Column Layout */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
    {/* Efficiency */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <b className="text-lg font-semibold text-gray-900">Efficiency</b>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad recusandae id ipsam expedita, maiores debitis.
      </p>
    </div>

    {/* Convenience */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <b className="text-lg font-semibold text-gray-900">Convenience</b>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad recusandae id ipsam expedita, maiores debitis.
      </p>
    </div>

    {/* Personalization */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <b className="text-lg font-semibold text-gray-900">Personalization</b>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad recusandae id ipsam expedita, maiores debitis.
      </p>
    </div>
  </div>
</div>

    </div>
  );
};

export default About;
